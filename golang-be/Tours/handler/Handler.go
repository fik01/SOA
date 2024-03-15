package handler

import (
	"gorm.io/gorm"
	"tours/model"
	"tours/repo"
	"tours/service"
)

type Handler struct {
	RatingHandler            *RatingHandler
	TourHandler              *TourHandler
	EquipmentHandler         *EquipmentHandler
	PositionSimulatorHandler *PositionSimulatorHandler
}

func NewHandler(db *gorm.DB) *Handler {
	handler := new(Handler)

	ratingRepo := &repo.CRUDRepository[model.Rating]{DatabaseConnection: db}
	ratingService := &service.RatingService{RatingRepo: ratingRepo}
	handler.RatingHandler = &RatingHandler{RatingService: ratingService}

	tourRepo := &repo.TourRepository{DatabaseConnection: db}
	tourService := &service.TourService{TourRepo: tourRepo}
	handler.TourHandler = &TourHandler{TourService: tourService}

	equipmentRepo := &repo.CRUDRepository[model.Equipment]{DatabaseConnection: db}
	equipmentService := &service.EquipmentService{EquipmentRepo: equipmentRepo}
	handler.EquipmentHandler = &EquipmentHandler{EquipmentService: equipmentService}

	positionRepo := &repo.CRUDRepository[model.Position]{DatabaseConnection: db}
	positionSimulatorService := &service.PositionSimulatorService{PositionRepo: positionRepo}
	handler.PositionSimulatorHandler = &PositionSimulatorHandler{PositionSimulatorService: positionSimulatorService}

	return handler

}
