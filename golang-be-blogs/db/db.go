package db

import (
	"context"
	"database-example/config"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect() (*mongo.Database) {
	mongoConfig := config.GetConnectionString()

	clientOptions := options.Client().ApplyURI(mongoConfig)

	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
		return nil
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Couldn't connect to MongoDB:", err)
		return nil
	}

	databaseName := "blogs"
	db := client.Database(databaseName)

	return db
}