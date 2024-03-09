package main

import (
	"log"
	"net/http"
	"tours/handler"
	"tours/model"
	"tours/repo"
	"tours/service"

	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initDB() *gorm.DB {
	// Set up database connection
	dsn := "host=localhost user=postgres password=super dbname=test_tour port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	// Migrate the schema
	err = db.AutoMigrate(&model.TourKeyPoint{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	err = db.AutoMigrate(&model.TourDuration{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	err = db.AutoMigrate(&model.Tour{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}

	return db
}

func startServer(handler *handler.TourHandler) {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/newtour", handler.Create).Methods("POST")
	router.HandleFunc("/updateTour", handler.Update).Methods("POST")
	router.HandleFunc("/getTours", handler.GetAll).Methods("GET")

	log.Println(http.ListenAndServe(":8080", router))
}

func main() {
	database := initDB()
	if database == nil {
		print("FAILED TO CONNECT TO DB")
		return
	} else {
		print("CONNECTED")
	}

	repo := &repo.TourRepository{DatabaseConnection: database}
	service := &service.TourService{TourRepo: repo}
	handler := &handler.TourHandler{TourService: service}

	startServer(handler)
}
