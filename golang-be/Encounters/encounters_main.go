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
	dsn := "host=localhost user=postgres password=super dbname=explorer-v1 port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	err = db.Exec("SET search_path TO encounters").Error
	if err != nil {
		log.Fatal("Error setting search path:",err)
	}

	// Migrate the schema
	// err = db.AutoMigrate(&model.UserExperience{})
	// if err != nil {
	// 	log.Fatalf("Error migrating schema: %v", err)
	// }
	err = db.AutoMigrate(&model.Challenge{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}

	err = db.AutoMigrate(&model.ChallengeExecution{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}

	return db
}

func startServer(database *gorm.DB){
	router := mux.NewRouter().StrictSlash(true)

	initUserExperience(router, database)
	initChallengeExecution(router, database)

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	println("Server starting")
	log.Fatal(http.ListenAndServe(":8081", router))
}

func initChallengeExecution(router *mux.Router, database *gorm.DB){
	repo := &repo.ChallengeExecutionRepository{DatabaseConnection: database}
	service := &service.ChallengeExecutionService{ChallengeExecutionRepository: repo}
	handler := &handler.ChallengeExecutionHandler{ChallengeExecutionService: service}

	router.HandleFunc("/tourist/challengeExecution", handler.Create).Methods("POST")
}

func initUserExperience(router *mux.Router, database *gorm.DB){
	repo := &repo.UserExperienceRepository{DatabaseConnection: database}
	service := &service.UserExperienceService{UserExperienceRepo: repo}
	handler := &handler.UserExperienceHandler{UserExperienceService: service}

	router.HandleFunc("/deleteUserExperience/{id}", handler.Delete).Methods("DELETE")
	router.HandleFunc("/getUserExperience/{id}", handler.GetXPByUserId).Methods("GET")
	router.HandleFunc("/newUserExperience", handler.Create).Methods("POST")
	router.HandleFunc("/addXP/{id}/{xp}", handler.AddXP).Methods("PUT")
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
