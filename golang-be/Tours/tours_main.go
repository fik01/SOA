package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func startServer() {
	router := mux.NewRouter().StrictSlash(true)
	log.Println(http.ListenAndServe(":8080", router))
}

func main() {
	startServer()
}
