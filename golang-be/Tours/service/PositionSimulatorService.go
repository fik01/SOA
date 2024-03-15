package service

import (
	"tours/model"
	"tours/repo"
)

type PositionSimulatorService struct {
	PositionRepo *repo.CRUDRepository[model.Position]
}

func (service *PositionSimulatorService) Create(position *model.Position) error {
	err := service.PositionRepo.Create(position)
	if err != nil {
		return err
	}
	return nil
}

func (service *PositionSimulatorService) GetByTouristId(id int) (*model.Position, error) {
	position, err := service.PositionRepo.Where("tourist_id = ?", id)
	if err != nil {
		return nil, err
	}
	return &(*position)[0], nil // wtf
}

func (service *PositionSimulatorService) Update(position *model.Position) error {
	err := service.PositionRepo.Update(position)
	if err != nil {
		return err
	}
	return nil
}

func (service *PositionSimulatorService) GetById(id int) (*model.Position, error) {
	position, err := service.PositionRepo.GetById(id)
	if err != nil {
		return nil, err
	}
	return position, nil // wtf
}
