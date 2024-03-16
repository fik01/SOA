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
	dsn := "host=localhost user=postgres password=super dbname=v1 port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	// Migrate the schema
	err = db.AutoMigrate(&model.UserExperience{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}

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

func startServer(handler *handler.UserExperienceHandler) {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/newUserExperience", handler.Create).Methods("POST")
	router.HandleFunc("/addXP/{id}/{xp}", handler.AddXP).Methods("PUT")

	//router.HandleFunc("/challengeExecution", handler.Create).Methods("POST")
	log.Println(http.ListenAndServe(":8081", router))
}

func startServer1(challengeExecutionHandler *handler.ChallengeExecutionHandler) {
	router1 := mux.NewRouter().StrictSlash(true)

	router1.HandleFunc("/tourist/challengeExecution", challengeExecutionHandler.Create).Methods("POST")
	log.Println(http.ListenAndServe(":8081", router1))
}

func main() {
	database := initDB()
	if database == nil {
		print("FAILED TO CONNECT TO DB")
		return
	} else {
		print("CONNECTED")
	}

	//repoa := &repo.UserExperienceRepository{DatabaseConnection: database}
	//servicea := &service.UserExperienceService{UserExperienceRepo: repoa}
	//handlera := &handler.UserExperienceHandler{UserExperienceService: servicea}

	challengeExecutionRepo := &repo.ChallengeExecutionRepository{DatabaseConnection: database}
	challengeExecutionService := &service.ChallengeExecutionService{ChallengeExecutionRepository: challengeExecutionRepo}
	challengeExecutionHandler := &handler.ChallengeExecutionHandler{ChallengeExecutionService: challengeExecutionService}

	//challengeExecutionHandler := &challengeExecutionHandler.ChallengeExecutionHandler{ChallengeExecutionService: challengeExecutionService}

	//startServer(handlera)
	startServer1(challengeExecutionHandler)
}
