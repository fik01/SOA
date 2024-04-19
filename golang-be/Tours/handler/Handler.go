package handler

import (
	//"tours/model"
	"tours/repo"
	"tours/service"

	"go.mongodb.org/mongo-driver/mongo"
)

type Handler struct {
	RatingHandler            *RatingHandler
	TourHandler              *TourHandler
	EquipmentHandler         *EquipmentHandler
	PositionSimulatorHandler *PositionSimulatorHandler
	TourKeyPointHandler      *TourKeyPointHandler
	TourProblemHandler       *TourProblemHandler
}

func NewHandler(db *mongo.Database) *Handler {
	handler := new(Handler)

	ratingRepo := &repo.RatingRepository{DatabaseConnection: db}
	ratingService := &service.RatingService{RatingRepo: ratingRepo}
	handler.RatingHandler = &RatingHandler{RatingService: ratingService}

	tourRepo := &repo.TourRepository{DatabaseConnection: db}
	tourService := &service.TourService{TourRepo: tourRepo}
	handler.TourHandler = &TourHandler{TourService: tourService}

	/*equipmentRepo := &repo.CRUDRepository[model.Equipment]{DatabaseConnection: db}
	equipmentService := &service.EquipmentService{EquipmentRepo: equipmentRepo}
	handler.EquipmentHandler = &EquipmentHandler{EquipmentService: equipmentService}
	*/
	positionRepo := &repo.PositionRepository{DatabaseConnection: db}
	positionSimulatorService := &service.PositionSimulatorService{PositionRepo: positionRepo}
	handler.PositionSimulatorHandler = &PositionSimulatorHandler{PositionSimulatorService: positionSimulatorService}

	tourKeyPointRepo := &repo.TourKeyPointRepository{DatabaseConnection: db}
	tourKeyPointService := &service.TourKeyPointService{TourKeyPointRepo: tourKeyPointRepo}
	handler.TourKeyPointHandler = &TourKeyPointHandler{TourKeyPointService: tourKeyPointService}
	/*
		tourProblemRepo := &repo.CRUDRepository[model.TourProblem]{DatabaseConnection: db}
		tourProblemService := &service.TourProblemService{TourProblemRepo: tourProblemRepo, ToursRepo: tourRepo}
		handler.TourProblemHandler = &TourProblemHandler{TourProblemService: tourProblemService}*/

	return handler

}
