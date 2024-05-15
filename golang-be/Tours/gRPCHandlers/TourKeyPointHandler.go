package gRPCHandlers

import (
	"context"
	"errors"
	tour_service "tours/proto/tour-service"
)

func (server *TourHandler) CreateTourKeyPoint(ctx context.Context, req *tour_service.TourKeyPoint) (*tour_service.TourKeyPoint, error) {
	kp := keyPointsProtoToModel(req)

	if &kp == nil {
		return nil, errors.New("Error while parsing rating!")
	}

	newKp, err := server.TourKeyPointService.Create(ctx, &kp)

	if err != nil {
		return nil, errors.New("Error while creating rating!")
	}

	resp := keyPointModelToProto(*newKp)

	return resp, nil
}

func (server *TourHandler) GetByTourId(ctx context.Context, req *tour_service.GetTourKeyPointTourId) (*tour_service.TourKeyPointPaged, error) {
	tourId := req.TourId

	tourKps, err := server.TourKeyPointService.GetByTourId(ctx, int(tourId))

	if err != nil {
		return nil, errors.New("Error while creating rating!")
	}

	resp := &tour_service.TourKeyPointPaged{}
	resp.TotalCount = 1
	resp.TourKeyPoints = getkeyPointsModelToProto(tourKps)

	return resp, nil
}

func (server *TourHandler) Update(ctx context.Context, req *tour_service.TourKeyPoint) (*tour_service.TourKeyPoint, error) {
	tkp := keyPointsProtoToModel(req)

	err := server.TourKeyPointService.Update(ctx, &tkp)

	if err != nil {
		return nil, errors.New("Error while creating rating!")
	}

	resp := &tour_service.TourKeyPoint{}
	resp = keyPointModelToProto(tkp)

	return resp, nil
}
