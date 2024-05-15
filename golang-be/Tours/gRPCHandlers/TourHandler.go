package gRPCHandlers

import (
	tour_service "tours/proto/tour-service"
	"tours/service"
)

type TourHandler struct {
	tour_service.UnimplementedTourServiceServer
	RatingService       *service.RatingService
	EquipmentService    *service.EquipmentService
	PositionService     *service.PositionSimulatorService
	TourSerice          *service.TourService
	TourKeyPointService *service.TourKeyPointService
}
