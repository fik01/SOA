package repo

import (
	"context"
	"sort"
	"tours/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type TourRepository struct {
	DatabaseConnection *mongo.Database
}

func (repo *TourRepository) CreateNewTour(ctx context.Context, tour *model.Tour) (*model.Tour, error) {
	collection := repo.DatabaseConnection.Collection("tours")
	_, err := collection.InsertOne(ctx, tour)
	if err != nil {
		return nil, err
	}

	return tour, nil
}

func (repo *TourRepository) GenerateCustomID(ctx context.Context) (int, error) {
	tours, err := repo.GetAll(ctx)
	if err != nil {
		return 0, err
	}
	sort.Slice(tours, func(i, j int) bool {
		return tours[i].Id > tours[j].Id
	})

	if len(tours) == 0 {
		return 1, nil
	}

	return tours[0].Id + 1, nil
}

func (repo *TourRepository) UpdateTour(ctx context.Context, tour *model.Tour) error {
	collection := repo.DatabaseConnection.Collection("tours")
	filter := bson.M{"_id": tour.Id}
	update := bson.M{"$set": tour}
	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}

func (repo *TourRepository) Get(ctx context.Context, id int) (*model.Tour, error) {
	var tour model.Tour
	collection := repo.DatabaseConnection.Collection("tours")
	filter := bson.M{"_id": id}
	err := collection.FindOne(ctx, filter).Decode(&tour)
	if err != nil {
		return nil, err
	}

	return &tour, nil
}

func (repo *TourRepository) GetAll(ctx context.Context) ([]model.Tour, error) {
	var tours []model.Tour
	collection := repo.DatabaseConnection.Collection("tours")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &tours); err != nil {
		return nil, err
	}

	return tours, nil
}

func (repo *TourRepository) GetAllByAuthorID(ctx context.Context, authorID int) ([]model.Tour, error) {
	var tours []model.Tour
	collection := repo.DatabaseConnection.Collection("tours")
	filter := bson.M{"author_id": authorID}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &tours); err != nil {
		return nil, err
	}

	return tours, nil
}
