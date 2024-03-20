package app

import (
	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"log"
	"net/http"
	"tours/config"
	"tours/db"
	"tours/handler"
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
