package repo

import (
	"context"
	"log"
	"sort"
	"tours/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type TourKeyPointRepository struct {
	DatabaseConnection *mongo.Database
}

func (repo *TourKeyPointRepository) Create(ctx context.Context, tour *model.TourKeyPoint) (*model.TourKeyPoint, error) {
	collection := repo.DatabaseConnection.Collection("tour_key_points")
	_, err := collection.InsertOne(ctx, tour)
	if err != nil {
		return nil, err
	}

	return tour, nil
}

func (repo *TourKeyPointRepository) GenerateCustomID(ctx context.Context) (int, error) {
	tourKeyPoints, err := repo.GetAll(ctx)
	if err != nil {
		return 0, err
	}
	sort.Slice(tourKeyPoints, func(i, j int) bool {
		return tourKeyPoints[i].Id > tourKeyPoints[j].Id
	})

	if len(tourKeyPoints) == 0 {
		return 1, nil
	}

	return tourKeyPoints[0].Id + 1, nil
}

func (repo *TourKeyPointRepository) GetAll(ctx context.Context) ([]model.TourKeyPoint, error) {
	var tourKeyPoints []model.TourKeyPoint
	collection := repo.DatabaseConnection.Collection("tour_key_points")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &tourKeyPoints); err != nil {
		return nil, err
	}

	return tourKeyPoints, nil
}

func (repo *TourKeyPointRepository) Get(ctx context.Context, id int) (*model.TourKeyPoint, error) {
	var tourKeyPoint model.TourKeyPoint
	collection := repo.DatabaseConnection.Collection("tour_key_points")
	filter := bson.M{"_id": id}
	err := collection.FindOne(ctx, filter).Decode(&tourKeyPoint)
	if err != nil {
		return nil, err
	}

	return &tourKeyPoint, nil
}

func (repo *TourKeyPointRepository) Update(ctx context.Context, tourKeyPoint *model.TourKeyPoint) error {
	collection := repo.DatabaseConnection.Collection("tour_key_points")
	filter := bson.M{"_id": tourKeyPoint.Id}
	update := bson.M{"$set": tourKeyPoint}
	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}

func (repo *TourKeyPointRepository) GetByTourId(ctx context.Context, tourkeyPointId int) ([]model.TourKeyPoint, error) {
	var keyPoints []model.TourKeyPoint
	collection := repo.DatabaseConnection.Collection("tour_key_points")
	filter := bson.M{"tour_id": tourkeyPointId}
	log.Println("Pre find")
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)
	log.Println("Posle find")
	if err := cursor.All(ctx, &keyPoints); err != nil {
		return nil, err
	}

	return keyPoints, nil
}
