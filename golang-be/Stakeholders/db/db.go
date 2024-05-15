package db

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"stakeholders/config"
)

func Connect() *mongo.Database {
	clientOptions := options.Client().ApplyURI(config.GetConnectionString())
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Check if the connection was successful
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	dbName := "stakeholders"
	db := client.Database(dbName)

	log.Println("Connected to MongoDB successfully")

	return db
}
