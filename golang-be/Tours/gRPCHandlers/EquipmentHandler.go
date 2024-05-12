package gRPCHandlers

import (
	"context"
	"errors"
	"tours/model"
	tour_service "tours/proto/tour-service"
)

func (server *TourHandler) GetEquipment(ctx context.Context, req *tour_service.EmptyRequest) (*tour_service.GetEquipmentResponse, error) {
	equipment, err := server.EquipmentService.Get()
	if err != nil {
		return nil, errors.New("Error while getting equipment: " + err.Error())
	}

	resp := &tour_service.GetEquipmentResponse{}
	resp.Equipment = equipmentModelToProtoMulti(equipment)

	return resp, nil
}

func (server *TourHandler) GetByIdEquipment(ctx context.Context, req *tour_service.GetEquipmentIdRequest) (*tour_service.Equipment, error) {
	equipment, err := server.EquipmentService.GetById(int(req.GetId()))
	if err != nil {
		return nil, errors.New("Error while getting equipment: " + err.Error())
	}
	resp := &tour_service.Equipment{}
	resp = equipmentModelToProto(equipment)

	return resp, nil
}

func (server *TourHandler) CreateEquipment(ctx context.Context, req *tour_service.Equipment) (*tour_service.StatusCodeResponse, error) {
	err := server.EquipmentService.Create(equipmentProtoToModel(req))
	if err != nil {
		return nil, errors.New("Error while creating equipment: " + err.Error())
	}
	resp := &tour_service.StatusCodeResponse{}
	resp.StatusCode = 200
	return resp, nil
}

func (server *TourHandler) UpdateEquipment(ctx context.Context, req *tour_service.Equipment) (*tour_service.StatusCodeResponse, error) {
	err := server.EquipmentService.Update(equipmentProtoToModel(req))
	if err != nil {
		return nil, errors.New("Error while creating equipment: " + err.Error())
	}
	resp := &tour_service.StatusCodeResponse{}
	resp.StatusCode = 200
	return resp, nil
}

func (server *TourHandler) DeleteEquipment(ctx context.Context, req *tour_service.DeleteEquipmentRequest) (*tour_service.StatusCodeResponse, error) {
	err := server.EquipmentService.Delete(int(req.GetId()))
	if err != nil {
		return nil, errors.New("Error while deleting equipment: " + err.Error())
	}
	resp := &tour_service.StatusCodeResponse{}
	resp.StatusCode = 200
	return resp, nil
}

func equipmentProtoToModel(proto *tour_service.Equipment) *model.Equipment {
	if proto != nil {
		m := &model.Equipment{
			ID:          int(proto.GetId()),
			Name:        proto.GetName(),
			Description: proto.GetDescription(),
		}
		return m
	}
	return nil
}

func equipmentModelToProto(m *model.Equipment) *tour_service.Equipment {
	if m != nil {
		p := &tour_service.Equipment{
			Id:          int32(m.ID),
			Name:        m.Name,
			Description: m.Description,
		}
		return p
	}
	return nil
}

func equipmentModelToProtoMulti(m []*model.Equipment) []*tour_service.Equipment {
	if m != nil {
		var p []*tour_service.Equipment

		for _, mo := range m {
			p = append(p, &tour_service.Equipment{
				Id:          int32(mo.ID),
				Name:        mo.Name,
				Description: mo.Description,
			})
		}

		return p
	}
	return nil
}
