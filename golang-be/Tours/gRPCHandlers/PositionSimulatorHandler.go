package gRPCHandlers

import (
	"context"
	"errors"
	"tours/model"
	tour_service "tours/proto/tour-service"
)

func (server *TourHandler) CreatePos(ctx context.Context, req *tour_service.Pos) (*tour_service.StatusCodeResponse, error) {
	err := server.PositionService.Create(ctx, posProtoToModel(req))
	if err != nil {
		return nil, errors.New("Error while creating position: " + err.Error())
	}
	resp := &tour_service.StatusCodeResponse{}
	resp.StatusCode = 200
	return resp, nil
}
func (server *TourHandler) UpdatePos(ctx context.Context, req *tour_service.Pos) (*tour_service.StatusCodeResponse, error) {
	err := server.PositionService.Update(ctx, posProtoToModel(req))
	if err != nil {
		return nil, errors.New("Error while updating position: " + err.Error())
	}
	resp := &tour_service.StatusCodeResponse{}
	resp.StatusCode = 200
	return resp, nil
}
func (server *TourHandler) GetTouristIdPos(ctx context.Context, req *tour_service.GetPosTouristRequest) (*tour_service.Pos, error) {
	pos, err := server.PositionService.GetByTouristId(ctx, int(req.GetTouristId()))
	if err != nil {
		return nil, errors.New("Error while getting position: " + err.Error())
	}
	resp := &tour_service.Pos{}
	resp = posModelToProto(pos)
	return resp, nil
}
func (server *TourHandler) GetIdPos(ctx context.Context, req *tour_service.GetPosIdRequest) (*tour_service.Pos, error) {
	pos, err := server.PositionService.GetById(ctx, int(req.GetId()))
	if err != nil {
		return nil, errors.New("Error while getting position: " + err.Error())
	}
	resp := &tour_service.Pos{}
	resp = posModelToProto(pos)
	return resp, nil
}

func posModelToProto(m *model.Position) *tour_service.Pos {
	if m != nil {
		p := &tour_service.Pos{
			Id:        int32(m.ID),
			Latitude:  m.Latitude,
			Longitude: m.Longitude,
			TouristId: int32(m.TouristId),
		}
		return p
	}
	return nil
}

func posProtoToModel(p *tour_service.Pos) *model.Position {
	if p != nil {
		m := &model.Position{
			ID:        int(p.GetId()),
			Latitude:  p.GetLatitude(),
			Longitude: p.GetLongitude(),
			TouristId: int(p.GetTouristId()),
		}
		return m
	}
	return nil
}
