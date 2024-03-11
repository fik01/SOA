package app

import (
	"github.com/gorilla/mux"
	"tours/handler"
)

func Route(router *mux.Router, handler *handler.Handler) {

	//Tours
	router.HandleFunc("/newtour", handler.TourHandler.Create).Methods("POST")
	router.HandleFunc("/updateTour", handler.TourHandler.Update).Methods("POST")
	router.HandleFunc("/getTours", handler.TourHandler.GetAll).Methods("GET")

	//Tour Rating
	router.HandleFunc("/rating/create", handler.RatingHandler.Create).Methods("POST")
	router.HandleFunc("/rating/getById", handler.RatingHandler.GetById).Methods("GET")
	router.HandleFunc("/rating/getByTourId", handler.RatingHandler.GetByTourId).Methods("GET")
	router.HandleFunc("/rating/getByPersonAndTourId", handler.RatingHandler.GetByPersonIdAndTourId).Methods("GET")
	router.HandleFunc("/rating/update", handler.RatingHandler.Update).Methods("POST")

}
