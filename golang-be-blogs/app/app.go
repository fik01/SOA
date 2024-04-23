package app

import (
	"database-example/config"
	"database-example/db"
	"database-example/handler"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

type App struct {
	db *mongo.Database
}

func Run() {
	app := new(App)

	app.db = db.Connect()

	handler := handler.NewHandler(app.db)
	router := mux.NewRouter().StrictSlash(true)
	Route(router, handler)

	log.Println(http.ListenAndServe(config.GetPort(), router))
}