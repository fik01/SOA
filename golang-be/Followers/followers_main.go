package main

import (
	"followers/handler"
	"followers/model"
	"followers/repo"
	"followers/service"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initDB() *gorm.DB {

	dsn := "host=localhost user=postgres password=super dbname=explorer-v1 port=5432 sslmode=disable"

	connectionString, isPresent := os.LookupEnv("DATABASE_URL_1")
	if isPresent {
		dsn = connectionString
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	err = db.Exec("SET search_path TO stakeholders").Error
	if err != nil {
		log.Fatal("Error setting search path:", err)
	}

	err = db.AutoMigrate(&model.Follower{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}

	return db
}

func startServer(database *gorm.DB) {
	router := mux.NewRouter().StrictSlash(true)

	initFollower(router, database)

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	println("Server starting")
	log.Fatal(http.ListenAndServe(":8081", router))
}

func initFollower(router *mux.Router, database *gorm.DB) {
	repo := &repo.FollowerRepository{DatabaseConnection: database}

	service := &service.FollowerService{FollowerRepository: repo}
	handler := &handler.FollowerHandler{FollowerService: service}

	router.HandleFunc("/tourist/follower", handler.CreateFollowerHandler).Methods("PUT")
	router.HandleFunc("/tourist/follower/{followerId}/{followedId}", handler.DeleteFollowerHandler).Methods("DELETE")
}

func main() {
	database := initDB()
	if database == nil {
		print("FAILED TO CONNECT TO DB")
		return
	} else {
		print("CONNECTED")
	}

	startServer(database)
}
