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
	router.HandleFunc("/getAllByAuthorId", handler.TourHandler.GetAllByAuthorId).Methods("GET")
	router.HandleFunc("/get", handler.TourHandler.Get).Methods("GET")

	//Tour Rating
	router.HandleFunc("/rating/create", handler.RatingHandler.Create).Methods("POST")
	router.HandleFunc("/rating/getById", handler.RatingHandler.GetById).Methods("GET")
	router.HandleFunc("/rating/getByTourId", handler.RatingHandler.GetByTourId).Methods("GET")
	router.HandleFunc("/rating/getByPersonAndTourId", handler.RatingHandler.GetByPersonIdAndTourId).Methods("GET")
	router.HandleFunc("/rating/update", handler.RatingHandler.Update).Methods("POST")

	//Equipment
	router.HandleFunc("/equipment/create", handler.EquipmentHandler.Create).Methods("POST")
	router.HandleFunc("/equipment/update", handler.EquipmentHandler.Update).Methods("POST")
	router.HandleFunc("/equipment/deleteById", handler.EquipmentHandler.Delete).Methods("GET")
	router.HandleFunc("/equipment/get", handler.EquipmentHandler.Get).Methods("GET")
	router.HandleFunc("/equipment/getById", handler.EquipmentHandler.GetById).Methods("GET")

	//Position simulator
	router.HandleFunc("/positionSimulator/create", handler.PositionSimulatorHandler.Create).Methods("POST")
	router.HandleFunc("/positionSimulator/update", handler.PositionSimulatorHandler.Update).Methods("POST")
	router.HandleFunc("/positionSimulator/getByTouristId", handler.PositionSimulatorHandler.GetByTouristId).Methods("GET")
	router.HandleFunc("/positionSimulator/getById", handler.PositionSimulatorHandler.GetById).Methods("GET")

}
