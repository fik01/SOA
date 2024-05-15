package main

import (
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"encounters/gRPCHandlers"
	"encounters/handler"
	"encounters/model"
	encounter_service "encounters/proto/encounters"
	"encounters/repo"
	"encounters/service"

	"github.com/gorilla/mux"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func initDB() *gorm.DB {

	dsn := "host=db user=postgres password=super dbname=explorer port=5433 sslmode=disable"

	connectionString, isPresent := os.LookupEnv("DATABASE_URL_1")
	if isPresent {
		dsn = connectionString
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	err = db.Exec("SET search_path TO encounters").Error
	if err != nil {
		log.Fatal("Error setting search path:", err)
	}

	// Migrate the schema
	err = db.AutoMigrate(&model.UserExperience{})
	if err != nil {
		log.Fatalf("Error migrating schema: %v", err)
	}
	// err = db.AutoMigrate(&model.Challenge{})
	// if err != nil {
	// 	log.Fatalf("Error migrating schema: %v", err)
	// }

	// err = db.AutoMigrate(&model.ChallengeExecution{})
	// if err != nil {
	// 	log.Fatalf("Error migrating schema: %v", err)
	// }

	return db
}

// func initGrpc() *grpc.Server {
// 	grpcServer := grpc.NewServer()
// 	reflection.Register(grpcServer)
// 	return grpcServer
// }

func startGRPCServer(database *gorm.DB) {
	// router := mux.NewRouter().StrictSlash(true)

	// initUserExperience(router, database)
	// initChallengeExecution(router, database)

	// router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	// println("Server starting")
	// log.Fatal(http.ListenAndServe(":8081", router))
}

func startHTTPServer(database *gorm.DB) {
	router := mux.NewRouter().StrictSlash(true)

	// initUserExperience(router, database)
	initChallengeExecution(router, database)

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	println("Server starting")
	log.Fatal(http.ListenAndServe(":8081", router))
}

func initChallengeExecution(router *mux.Router, database *gorm.DB) {
	repo := &repo.ChallengeExecutionRepository{DatabaseConnection: database}
	service := &service.ChallengeExecutionService{ChallengeExecutionRepository: repo}
	handler := &handler.ChallengeExecutionHandler{ChallengeExecutionService: service}

	router.HandleFunc("/tourist/challengeExecution", handler.Create).Methods("POST")
	router.HandleFunc("/tourist/challengeExecution/{id}", handler.Delete).Methods("DELETE")
	router.HandleFunc("/tourist/challengeExecution/{id}", handler.Update).Methods("PUT")
	router.HandleFunc("/tourist/challengeExecution", handler.GetAll).Methods("GET")
}

// func initUserExperience(router *mux.Router, database *gorm.DB) {
// 	repo := &repo.UserExperienceRepository{DatabaseConnection: database}
// 	service := &service.UserExperienceService{UserExperienceRepo: repo}
// 	handler := &gRPCHandlers.UserExperienceHandler{UserExperienceService: service}
// }

func main() {
	database := initDB()
	if database == nil {
		print("FAILED TO CONNECT TO DB")
		return
	} else {
		print("CONNECTED")
	}

	listener, err := net.Listen("tcp", "ENCOUNTER_SERVICE_ADDRESS")
	if err != nil {
		log.Fatalln(err)
	}
	defer func(listener net.Listener) {
		err := listener.Close()
		if err != nil {
			log.Fatal(err)
		}
	}(listener)

	repo := &repo.UserExperienceRepository{DatabaseConnection: database}
	service := &service.UserExperienceService{UserExperienceRepo: repo}
	var handler = gRPCHandlers.EncounterHandler{UserExperienceService: service}

	//encounter_service.RegisterEncounterServiceServer(grpcServer, &serverTourHandler)

	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)
	encounter_service.RegisterEncounterServiceServer(grpcServer, &handler)

	go func(){
		if err := grpcServer.Serve(listener); err != nil {
			log.Fatal("server error: ", err)
	  }
	}()

	stopCh := make(chan os.Signal)
	signal.Notify(stopCh, syscall.SIGTERM)

	<-stopCh

	grpcServer.Stop()
}
