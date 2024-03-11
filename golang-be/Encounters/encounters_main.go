package main

import (
	"log"
	"net/http"

	"encounters.xws.com/handler"
	"encounters.xws.com/model"
	"encounters.xws.com/repo"
	"encounters.xws.com/service"
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initDB() *gorm.DB {
	// Set up database connection
	dsn := "host=localhost user=postgres password=super dbname=test_encounter port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	// Migrate the schema
	err = db.AutoMigrate(&model.UserExperience{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}

	return db
}

func startServer(handler *handler.UserExperienceHandler) {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/newUserExperience", handler.Create).Methods("POST")
	router.HandleFunc("/addXP/{id}/{xp}", handler.AddXP).Methods("PUT")
	log.Println(http.ListenAndServe(":8081", router))
}


func main() {
	database := initDB()
	if database == nil {
		print("FAILED TO CONNECT TO DB")
		return
	} else {
		print("CONNECTED")
	}

	repo := &repo.UserExperienceRepository{DatabaseConnection: database}
	service := &service.UserExperienceService{UserExperienceRepo: repo}
	handler := &handler.UserExperienceHandler{UserExperienceService: service}

	startServer(handler)
}