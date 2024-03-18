package app

import (
	"database-example/config"
	"database-example/db"
	"database-example/handler"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type App struct {
	db *gorm.DB
}

func Run() {
	app := new(App)

	app.db = db.Connect()
	db.AutoMigrate(app.db)

	handler := handler.NewHandler(app.db)
	router := mux.NewRouter().StrictSlash(true)
	Route(router, handler)

	log.Println(http.ListenAndServe(config.GetPort(), router))
}