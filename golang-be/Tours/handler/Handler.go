package handler

import (
	"tours/model"
	"tours/repo"
	"tours/service"

	"gorm.io/gorm"
)

type Handler struct {
	RatingHandler       *RatingHandler
	TourHandler         *TourHandler
	TourKeyPointHandler *TourKeyPointHandler
}

func NewHandler(db *gorm.DB) *Handler {
	handler := new(Handler)

	ratingRepo := &repo.CRUDRepository[model.Rating]{DatabaseConnection: db}
	ratingService := &service.RatingService{RatingRepo: ratingRepo}
	handler.RatingHandler = &RatingHandler{RatingService: ratingService}

	tourRepo := &repo.TourRepository{DatabaseConnection: db}
	tourService := &service.TourService{TourRepo: tourRepo}
	handler.TourHandler = &TourHandler{TourService: tourService}

	tourKeyPointRepo := &repo.CRUDRepository[model.TourKeyPoint]{DatabaseConnection: db}
	tourKeyPointService := &service.TourKeyPointService{TourKeyPointRepo: tourKeyPointRepo}
	handler.TourKeyPointHandler = &TourKeyPointHandler{TourKeyPointService: tourKeyPointService}

	return handler

}
