package app

import (
	"log"
	"net/http"
	"tours/config"
	"tours/db"
	"tours/handler"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

type App struct {
	db *mongo.Database
}

func Run() {
	app := new(App)

	app.db = db.Connect()
	/*db.AutoMigrate(app.db)*/

	handler := handler.NewHandler(app.db)
	router := mux.NewRouter().StrictSlash(true)
	Route(router, handler)

	log.Println(http.ListenAndServe(config.GetPort(), router))
}
