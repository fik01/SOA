package repo

import (
	"context"
	"sort"
	"tours/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type RatingRepository struct {
	DatabaseConnection *mongo.Database
}

func (repo *RatingRepository) Create(ctx context.Context, rating *model.Rating) (*model.Rating, error) {
	collection := repo.DatabaseConnection.Collection("ratings")
	_, err := collection.InsertOne(ctx, rating)
	if err != nil {
		return nil, err
	}

	return rating, nil
}

func (repo *RatingRepository) GenerateCustomID(ctx context.Context) (int, error) {
	ratings, err := repo.GetAll(ctx)
	if err != nil {
		return 0, err
	}
	sort.Slice(ratings, func(i, j int) bool {
		return ratings[i].ID > ratings[j].ID
	})

	if len(ratings) == 0 {
		return 1, nil
	}

	return ratings[0].ID + 1, nil
}

func (repo *RatingRepository) GetAll(ctx context.Context) ([]model.Rating, error) {
	var rating []model.Rating
	collection := repo.DatabaseConnection.Collection("ratings")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &rating); err != nil {
		return nil, err
	}

	return rating, nil
}

func (repo *RatingRepository) Get(ctx context.Context, id int) (*model.Rating, error) {
	var rating model.Rating
	collection := repo.DatabaseConnection.Collection("ratings")
	filter := bson.M{"_id": id}
	err := collection.FindOne(ctx, filter).Decode(&rating)
	if err != nil {
		return nil, err
	}

	return &rating, nil
}

func (repo *RatingRepository) Update(ctx context.Context, rating *model.Rating) error {
	collection := repo.DatabaseConnection.Collection("ratings")
	filter := bson.M{"_id": rating.ID}
	update := bson.M{"$set": rating}
	_, err := collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return err
	}

	return nil
}

func (repo *RatingRepository) GetByTourId(ctx context.Context, tourId int) ([]*model.Rating, error) {
	var ratings []*model.Rating
	collection := repo.DatabaseConnection.Collection("ratings")
	filter := bson.M{"TourId": tourId}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &ratings); err != nil {
		return nil, err
	}

	return ratings, nil
}

func (repo *RatingRepository) GetByTourIdAndPersonId(ctx context.Context, tourId int, personeId int) (*model.Rating, error) {
	var ratings *model.Rating
	collection := repo.DatabaseConnection.Collection("ratings")
	filter := bson.M{"TourId": tourId, "PersonId": personeId}
	cursor, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &ratings); err != nil {
		return nil, err
	}

	return ratings, nil
}
