package repo

import (
	"context"
	"reflect"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type CRUDRepository[T any] struct {
	DatabaseConnection *mongo.Database
	CollectionName     string
	PrimaryKeyField    string
}

func (repo *CRUDRepository[T]) Create(entity *T) error {
	_, err := repo.DatabaseConnection.Collection(repo.CollectionName).InsertOne(context.Background(), entity)
	return err
}

func (repo *CRUDRepository[T]) GetById(id interface{}) (T, error) {
	var entity T
	err := repo.DatabaseConnection.Collection(repo.CollectionName).FindOne(context.Background(), bson.M{repo.PrimaryKeyField: id}).Decode(&entity)
	return entity, err
}

func (repo *CRUDRepository[T]) GetAll() (*[]T, error) {
	var entities []T
	cur, err := repo.DatabaseConnection.Collection(repo.CollectionName).Find(context.Background(), bson.D{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var entity T
		if err := cur.Decode(&entity); err != nil {
			return nil, err
		}
		entities = append(entities, entity)
	}

	return &entities, nil
}

func (repo *CRUDRepository[T]) Update(entity *T) error {
	_, err := repo.DatabaseConnection.Collection(repo.CollectionName).ReplaceOne(context.Background(), bson.M{repo.PrimaryKeyField: getId(entity)}, entity)
	return err
}

func (repo *CRUDRepository[T]) Delete(id interface{}) error {
	_, err := repo.DatabaseConnection.Collection(repo.CollectionName).DeleteOne(context.Background(), bson.M{repo.PrimaryKeyField: id})
	return err
}

func (repo *CRUDRepository[T]) Where(query interface{}) (*[]T, error) {
	var entities []T
	cur, err := repo.DatabaseConnection.Collection(repo.CollectionName).Find(context.Background(), query)
	if err != nil {
		return nil, err
	}
	defer cur.Close(context.Background())

	for cur.Next(context.Background()) {
		var entity T
		if err := cur.Decode(&entity); err != nil {
			return nil, err
		}
		entities = append(entities, entity)
	}

	return &entities, nil
}

func getId(entity interface{}) interface{} {

    value := reflect.ValueOf(entity)
    idField := value.FieldByName("Id")
    if idField.IsValid() {
        return idField.Interface()
    }

    return nil
}