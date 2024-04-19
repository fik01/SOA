package repo

import (
	"context"
	"sort"
	"tours/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type PositionRepository struct {
	DatabaseConnection *mongo.Database
}

func (repo *PositionRepository) Create(ctx context.Context, position *model.Position) (*model.Position, error) {
	collection := repo.DatabaseConnection.Collection("positions")
	_, err := collection.InsertOne(ctx, position)
	if err != nil {
		return nil, err
	}

	return position, nil
}

func (repo *PositionRepository) GenerateCustomID(ctx context.Context) (int, error) {
	position, err := repo.GetAll(ctx)
	if err != nil {
		return 0, err
	}
	sort.Slice(position, func(i, j int) bool {
		return position[i].ID > position[j].ID
	})

	if len(position) == 0 {
		return 1, nil
	}

	return position[0].ID + 1, nil
}
func (repo *PositionRepository) GetAll(ctx context.Context) ([]model.Rating, error) {
	var ratings []model.Rating
	collection := repo.DatabaseConnection.Collection("ratings")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &ratings); err != nil {
		return nil, err
	}

	return ratings, nil
}

func (repo *PositionRepository) Update(ctx context.Context, position *model.Position) error {
	collection := repo.DatabaseConnection.Collection("tours")
	filter := bson.M{"_id": position.ID}
	update := bson.M{"$set": position}
	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}
func (repo *PositionRepository) Get(ctx context.Context, id int) (*model.Position, error) {
	var position model.Position
	collection := repo.DatabaseConnection.Collection("positions")
	filter := bson.M{"_id": id}
	err := collection.FindOne(ctx, filter).Decode(&position)
	if err != nil {
		return nil, err
	}

	return &position, nil
}
func (repo *PositionRepository) GetByTouristId(ctx context.Context, touristId int) (*[]model.Position, error) {
	var position *[]model.Position
	collection := repo.DatabaseConnection.Collection("positions")
	filter := bson.M{"tourist_id": touristId}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	if err := cursor.All(ctx, &position); err != nil {
		return nil, err
	}

	return position, nil
}
