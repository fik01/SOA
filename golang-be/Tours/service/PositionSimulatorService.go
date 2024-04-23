package service

import (
	"context"
	"tours/model"
	"tours/repo"
)

type PositionSimulatorService struct {
	PositionRepo *repo.PositionRepository
}

func (service *PositionSimulatorService) Create(ctx context.Context, position *model.Position) error {
	customID, err := service.PositionRepo.GenerateCustomID(ctx)
	if err != nil {
		return nil
	}

	position.ID = customID

	_, err = service.PositionRepo.Create(ctx, position)
	if err != nil {
		return err
	}
	return nil
}

func (service *PositionSimulatorService) GetByTouristId(ctx context.Context, id int) (*model.Position, error) {
	position, err := service.PositionRepo.GetByTouristId(ctx, id)
	if err != nil {
		return nil, err
	}
	if len(*position) == 0 {
		newPos := model.Position{
			Latitude:  45.267136,
			Longitude: 19.833549,
			TouristId: id,
		}

		err = service.Create(ctx, &newPos)
		if err != nil {
			return nil, err
		}
		return &newPos, nil
	}
	return &(*position)[0], nil // wtf
}

func (service *PositionSimulatorService) Update(ctx context.Context, position *model.Position) error {
	err := service.PositionRepo.Update(ctx, position)
	if err != nil {
		return err
	}
	return nil
}

func (service *PositionSimulatorService) GetById(ctx context.Context, id int) (*model.Position, error) {
	position, err := service.PositionRepo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return position, nil // wtf
}
