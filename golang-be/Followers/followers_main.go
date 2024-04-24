package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"followers/model"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/neo4j/neo4j-go-driver/v5/neo4j"
)

// func initDB() *gorm.DB {

// 	dsn := "host=localhost user=postgres password=super dbname=explorer-v1 port=5432 sslmode=disable"

// 	connectionString, isPresent := os.LookupEnv("DATABASE_URL_1")
// 	if isPresent {
// 		dsn = connectionString
// 	}

// 	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
// 	if err != nil {
// 		log.Fatalf("Error connecting to database: %v", err)
// 	}

// 	err = db.Exec("SET search_path TO stakeholders").Error
// 	if err != nil {
// 		log.Fatal("Error setting search path:", err)
// 	}

// 	//err = db.AutoMigrate(&model.Follower{})
// 	//if err != nil {
// 	//	log.Fatalf("Error migrating schema: %v", err)
// 	//}

// 	return db
// }


func startServer(database *log.Logger) {
	router := mux.NewRouter().StrictSlash(true)

	initFollower(router, database)

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
	println("Server starting")

	log.Fatal(http.ListenAndServe(":8082", router))
}

func initFollower(router *mux.Router, database *log.Logger) {
	// repo := &repo.CRUDRepository[model.Follower]{DatabaseConnection: database}
	// service := &service.FollowerService{CRUDRepository: repo}
	// handler := &handler.FollowerHandler{FollowerService: service}

	router.HandleFunc("/tourist/follower", WriteFollowerr).Methods("PUT")
	router.HandleFunc("/tourist/follower/{followerId}/{followedId}", DeleteFollowerr).Methods("DELETE")
	router.HandleFunc("/tourist/follower/followings/{followerId}", GetRecomended).Methods("GET")
}

func main() {
	// database := initDB()
	// if database == nil {
	// 	print("FAILED TO CONNECT TO DB")
	// 	return
	// } else {
	// 	print("CONNECTED")
	// }

	//startServer(database)
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

	startServer(storeLogger)

	//var personOne = model.Follower{}
	//err = store.WriteFollower(&personOne)

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

	return &FollowerRepo{
		driver: driver,
		logger: logger,
	}, nil
}

func (pr *FollowerRepo) CheckConnection() {
	ctx := context.Background()
	err := pr.driver.VerifyConnectivity(ctx)
	if err != nil {
		pr.logger.Panic(err)
		return
	}

	pr.logger.Printf(`Neo4J server address: %s`, pr.driver.Target().Host)
}

func (pr *FollowerRepo) CloseDriverConnection(ctx context.Context) {
	pr.driver.Close(ctx)
}

/*func (pr *FollowerRepo) WriteFollower(follower *model.Follower) error {
	ctx := context.Background()
	session := pr.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: "neo4j"})
	defer session.Close(ctx)

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
}*/

func WriteFollowerr(w http.ResponseWriter, r *http.Request) {

	var follower model.Follower
	err := json.NewDecoder(r.Body).Decode(&follower)
	if err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	storeLogger := log.New(os.Stdout, "[follower-store] ", log.LstdFlags)

	store, err := New(storeLogger)
	if err != nil {
		storeLogger.Fatal(err)
	}
	defer store.CloseDriverConnection(context.Background())
	store.CheckConnection()

	//err = store.WriteFollower(&follower)
	//if err != nil {
	//	storeLogger.Println("Error writing follower to database:", err)
	//	http.Error(w, "Failed to write follower to database", http.StatusInternalServerError)
	//	return
	//}

	err = store.CreateConnectionBetweenUsers(int(follower.FollowerID), int(follower.FollowedID))
	if err != nil {
		storeLogger.Println("Error creating connection between users:", err)
		http.Error(w, "Failed to create connection between users", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Follower created successfully and connection established between users"))
}

func (pr *FollowerRepo) CreateConnectionBetweenUsers(followerID, followedID int) error {
	ctx := context.Background()
	session := pr.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: "neo4j"})
	defer session.Close(ctx)

	// Check if the connection already exists
	result, err := session.Run(
		ctx,
		"MATCH (follower:User)-[:FOLLOWS]->(followed:User) WHERE follower.id = $followerID AND followed.id = $followedID RETURN COUNT(*)",
		map[string]interface{}{
			"followerID": followerID,
			"followedID": followedID,
		},
	)
	if err != nil {
		pr.logger.Println("Error checking connection between users:", err)
		return err
	}

	if result.Next(ctx) {
		record := result.Record()
		countValue, ok := record.Get("COUNT(*)")
		if !ok {
			return errors.New("count not found in result")
		}
		count, ok := countValue.(int64)
		if !ok {
			return errors.New("failed to parse count")
		}
		if count > 0 {
			return errors.New("connection already exists between users")
		}
	} else {
		return result.Err()
	}

	_, err = session.Run(
		ctx,
		"MATCH (follower:User), (followed:User) WHERE follower.id = $followerID AND followed.id = $followedID CREATE (follower)-[:FOLLOWS]->(followed)",
		map[string]interface{}{
			"followerID": followerID,
			"followedID": followedID,
		},
	)
	if err != nil {
		pr.logger.Println("Error creating connection between users:", err)
		return err
	}
	return nil
}

func DeleteFollowerr(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	followerID := params["followerId"]
	followedID := params["followedId"]

	followerIDInt, err := strconv.Atoi(followerID)
	if err != nil {
		http.Error(w, "Invalid follower ID", http.StatusBadRequest)
		return
	}
	followedIDInt, err := strconv.Atoi(followedID)
	if err != nil {
		http.Error(w, "Invalid followed ID", http.StatusBadRequest)
		return
	}

	storeLogger := log.New(os.Stdout, "[follower-store] ", log.LstdFlags)

	store, err := New(storeLogger)
	if err != nil {
		storeLogger.Fatal(err)
	}
	defer store.CloseDriverConnection(context.Background())
	store.CheckConnection()

	err = store.DeleteConnectionBetweenUsers(followerIDInt, followedIDInt)
	if err != nil {
		storeLogger.Println("Error deleting connection between users:", err)
		http.Error(w, "Failed to delete connection between users", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Connection between users deleted successfully"))
}

func (pr *FollowerRepo) DeleteConnectionBetweenUsers(followerID, followedID int) error {
	ctx := context.Background()
	session := pr.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: "neo4j"})
	defer session.Close(ctx)

	_, err := session.Run(
		ctx,
		"MATCH (follower:User)-[r:FOLLOWS]->(followed:User) WHERE follower.id = $followerID AND followed.id = $followedID DELETE r",
		map[string]interface{}{
			"followerID": followerID,
			"followedID": followedID,
		},
	)
	if err != nil {
		pr.logger.Println("Error deleting connection between users:", err)
		return err
	}
	return nil
}

func GetRecomended(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	followerID := params["followerId"]
	followerIDInt, err := strconv.Atoi(followerID)
	if err != nil {
		http.Error(w, "Invalid follower ID", http.StatusBadRequest)
		return
	}

	fmt.Println("Follower ID:", followerIDInt)

	storeLogger := log.New(os.Stdout, "[follower-store] ", log.LstdFlags)

	store, err := New(storeLogger)
	if err != nil {
		storeLogger.Fatal(err)
	}
	defer store.CloseDriverConnection(context.Background())
	store.CheckConnection()

	users, err := store.GetRecomendedUsers(followerIDInt)
	if err != nil {
		storeLogger.Println("Error retrieving recomendations for user:", err)
		http.Error(w, "Failed to retrieve recomendations for user", http.StatusInternalServerError)
		return
	}

	usersJSON, err := json.Marshal(users)
	if err != nil {
		storeLogger.Println("Error marshaling users to JSON:", err)
		http.Error(w, "Failed to marshal users to JSON", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(usersJSON)
}

func (pr *FollowerRepo) GetRecomendedUsers(followerID int) (model.Users, error) {
    ctx := context.Background()
    session := pr.driver.NewSession(ctx, neo4j.SessionConfig{DatabaseName: "neo4j"})
    defer session.Close(ctx)

    result, err := session.ExecuteRead(
        ctx,
        func(transaction neo4j.ManagedTransaction) (any, error) {
            result, err := transaction.Run(ctx,
                `MATCH (user:User {id: $userId})-[:FOLLOWS]->(followed),
                  (followed)-[:FOLLOWS]->(suggested)
                  WHERE NOT (user)-[:FOLLOWS]->(suggested)
                  RETURN suggested.id AS id, suggested.name AS name`,
                map[string]interface{}{
                    "userId": followerID,
                })
            if err != nil {
                return nil, err
            }

            var users model.Users
            for result.Next(ctx) {
                record := result.Record()

                id, ok := record.Get("id")
                if !ok {
                    return nil, errors.New("ID not found in the record")
                }
                name, ok := record.Get("name")
                if !ok {
                    return nil, errors.New("Name not found in the record")
                }

                userID, ok := id.(int64)
                if !ok {
                    return nil, errors.New("Failed to assert ID as int64")
                }

                userName, ok := name.(string)
                if !ok {
                    return nil, errors.New("Failed to assert Name as string")
                }

                users = append(users, &model.User{
                    ID:   userID,
                    Name: userName,
                })
            }
            return users, nil
        })
    if err != nil {
        pr.logger.Println("Error querying search:", err)
        return nil, err
    }
    return result.(model.Users), nil
}