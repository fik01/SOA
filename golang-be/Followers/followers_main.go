package main

import (
	"context"
	"followers/handler"
	"followers/model"
	"followers/repo"
	"followers/service"
	"log"
	"net/http"
	"os"
	"os/signal"

	"github.com/gorilla/mux"
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
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

	//err = db.AutoMigrate(&model.Follower{})
	//if err != nil {
	//	log.Fatalf("Error migrating schema: %v", err)
	//}

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
	repo := &repo.CRUDRepository[model.Follower]{DatabaseConnection: database}
	service := &service.FollowerService{CRUDRepository: repo}
	handler := &handler.FollowerHandler{FollowerService: service}

	router.HandleFunc("/tourist/follower", handler.CreateFollowerHandler).Methods("PUT")

}

func main() {
	// database := initDB()
	// if database == nil {
	// 	print("FAILED TO CONNECT TO DB")
	// 	return
	// } else {
	// 	print("CONNECTED")
	// }

	// startServer(database)
	//Initialize the logger we are going to use, with prefix and datetime for every log
	storeLogger := log.New(os.Stdout, "[follower-store] ", log.LstdFlags)

	// NoSQL: Initialize Movie Repository store
	store, err := New(storeLogger)
	if err != nil {
		storeLogger.Fatal(err)
	}
	defer store.CloseDriverConnection(context.Background())
	store.CheckConnection()

	sigCh := make(chan os.Signal)
	signal.Notify(sigCh, os.Interrupt)
	signal.Notify(sigCh, os.Kill)
	storeLogger.Println("Successfully connected!")

	var personOne = model.Follower{}
	err = store.WriteFollower(&personOne)


	// err = store.CreateConnectionBetweenPersons()

	if err != nil {
		storeLogger.Println("ERROR!")
	}

	sig := <-sigCh
	storeLogger.Println("Received terminate, graceful shutdown", sig)
}


type FollowerRepo struct {
	driver neo4j.DriverWithContext
	logger *log.Logger
}

func New(logger *log.Logger) (*FollowerRepo, error) {
	// Local instance
	uri := os.Getenv("NEO4J_DB")
	user := os.Getenv("NEO4J_USERNAME")
	pass := os.Getenv("NEO4J_PASS")
	auth := neo4j.BasicAuth(user, pass, "")

	driver, err := neo4j.NewDriverWithContext(uri, auth)
	if err != nil {
		logger.Panic(err)
		return nil, err
	}

	// Return repository with logger and DB session
	return &FollowerRepo{
		driver: driver,
		logger: logger,
	}, nil
}

// CheckConnection Check if connection is established
func (pr *FollowerRepo) CheckConnection() {
	ctx := context.Background()
	err := pr.driver.VerifyConnectivity(ctx)
	if err != nil {
		pr.logger.Panic(err)
		return
	}
	// Print Neo4J server address
	pr.logger.Printf(`Neo4J server address: %s`, pr.driver.Target().Host)
}

// CloseDriverConnection Disconnect from database
func (pr *FollowerRepo) CloseDriverConnection(ctx context.Context) {
	pr.driver.Close(ctx)
}

func (pr *FollowerRepo) WriteFollower(follower *model.Follower) error {
	ctx := context.Background()
	session := pr.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: "neo4j"})
	defer session.Close(ctx)

	// ExecuteWrite for write transactions (Create/Update/Delete)
	savedFollower, err := session.ExecuteWrite(ctx,
		func(transaction neo4j.ManagedTransaction) (any, error) {
			result, err := transaction.Run(ctx,
				"CREATE (f:Follower) SET f.name = $name, f.surname = $surname RETURN f.name + ', from node ' + id(f)",
				map[string]any{"name": "ime", "surname": "prezime"})
			if err != nil {
				return nil, err
			}

			if result.Next(ctx) {
				return result.Record().Values[0], nil
			}

			return nil, result.Err()
		})
	if err != nil {
		pr.logger.Println("Error inserting Follower:", err)
		return err
	}
	pr.logger.Println(savedFollower.(string))
	return nil
}
