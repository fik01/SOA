package main

import (
	"log"
	"net/http"

	"encounters.xws.com/handler"
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

	return db
}

func startServerUserExperience(userExperienceHandler *handler.UserExperienceHandler) {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/newUserExperience", userExperienceHandler.Create).Methods("POST")
	router.HandleFunc("/addXP/{id}/{xp}", userExperienceHandler.AddXP).Methods("PUT")

	log.Println(http.ListenAndServe(":8081", router))
}

func startServerChallengeExecution(challengeExecutionHandler *handler.ChallengeExecutionHandler) {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/tourist/challengeExecution", challengeExecutionHandler.Create).Methods("POST")
	router.HandleFunc("/tourist/challengeExecution/{id}", challengeExecutionHandler.Delete).Methods("DELETE")
	router.HandleFunc("/tourist/challengeExecution/{id}", challengeExecutionHandler.Update).Methods("PUT")
	router.HandleFunc("/tourist/challengeExecution", challengeExecutionHandler.GetAll).Methods("GET")

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

	//userExperiencerepo := &repo.UserExperienceRepository{DatabaseConnection: database}
	//userExperienceservice := &service.UserExperienceService{UserExperienceRepo: userExperiencerepo}
	//userExperiencehandler := &handler.UserExperienceHandler{UserExperienceService: userExperienceservice}

	//startServerUserExperience(userExperiencehandler)

	challengeExecutionRepo := &repo.ChallengeExecutionRepository{DatabaseConnection: database}
	challengeExecutionService := &service.ChallengeExecutionService{ChallengeExecutionRepository: challengeExecutionRepo}
	challengeExecutionHandler := &handler.ChallengeExecutionHandler{ChallengeExecutionService: challengeExecutionService}

	startServerChallengeExecution(challengeExecutionHandler)

}
