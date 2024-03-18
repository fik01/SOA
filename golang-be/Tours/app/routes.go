package app

import (
	"tours/handler"

	"github.com/gorilla/mux"
)

func Route(router *mux.Router, handler *handler.Handler) {

	//Tours
	router.HandleFunc("/newtour", handler.TourHandler.Create).Methods("POST")
	router.HandleFunc("/updateTour", handler.TourHandler.Update).Methods("POST")
	router.HandleFunc("/getTours", handler.TourHandler.GetAll).Methods("GET")
	router.HandleFunc("/getAllByAuthorId", handler.TourHandler.GetAllByAuthorId).Methods("GET")
	router.HandleFunc("/get", handler.TourHandler.Get).Methods("GET")
	router.HandleFunc("/publish", handler.TourHandler.Publish).Methods("PUT")
	router.HandleFunc("/archive", handler.TourHandler.Archive).Methods("PUT")

	//Tour Rating
	router.HandleFunc("/rating/create", handler.RatingHandler.Create).Methods("POST")
	router.HandleFunc("/rating/getById", handler.RatingHandler.GetById).Methods("GET")
	router.HandleFunc("/rating/getByTourId", handler.RatingHandler.GetByTourId).Methods("GET")
	router.HandleFunc("/rating/getByPersonAndTourId", handler.RatingHandler.GetByPersonIdAndTourId).Methods("GET")
	router.HandleFunc("/rating/update", handler.RatingHandler.Update).Methods("POST")

	//Tour key point
	router.HandleFunc("/tourKeyPoint/create", handler.TourKeyPointHandler.Create).Methods("POST")
	router.HandleFunc("/tourKeyPoint/update", handler.TourKeyPointHandler.Update).Methods("POST")
	router.HandleFunc("/tourKeyPoint/getById", handler.TourKeyPointHandler.GetById).Methods("GET")
	router.HandleFunc("/tourKeyPoint/getByTourId", handler.TourKeyPointHandler.GetByTourId).Methods("GET")
	router.HandleFunc("/tourKeyPoint/delete", handler.TourKeyPointHandler.Delete).Methods("DELETE")

	//Tour problems
	router.HandleFunc("/tourProblem/create", handler.TourProblemHandler.Create).Methods("POST")
	router.HandleFunc("/tourProblem/update", handler.TourProblemHandler.Update).Methods("PUT")
	router.HandleFunc("/tourProblem/getByTouristId", handler.TourProblemHandler.GetByTouristId).Methods("GET")
}
