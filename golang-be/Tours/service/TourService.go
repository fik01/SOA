package service

import (
	"context"
	"tours/model"
	"tours/repo"
)

type TourService struct {
	TourRepo *repo.TourRepository
}

func (service *TourService) Create(ctx context.Context, tour *model.Tour) (*model.Tour, error) {
	customID, err := service.TourRepo.GenerateCustomID(ctx)
	if err != nil {
		return nil, err
	}

	tour.Id = customID

	newTour, err := service.TourRepo.CreateNewTour(ctx, tour)
	if err != nil {
		return nil, err
	}
	return newTour, nil
}

func (service *TourService) Update(ctx context.Context, tour *model.Tour) error {
	err := service.TourRepo.UpdateTour(ctx, tour)
	if err != nil {
		return err
	}
	return nil
}

func (service *TourService) GetAll(ctx context.Context) ([]model.Tour, error) {
	tours, err := service.TourRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return tours, nil
}

func (service *TourService) GetAllByAuthorID(ctx context.Context, authorID int) ([]model.Tour, error) {
	tours, err := service.TourRepo.GetAllByAuthorID(ctx, authorID)
	if err != nil {
		return nil, err
	}
	return tours, nil
}

func (service *TourService) Get(ctx context.Context, id int) (*model.Tour, error) {
	tour, err := service.TourRepo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return tour, nil
}

func (service *TourService) Publish(ctx context.Context, authorID, tourID int) (*model.Tour, error) {
	tour, err := service.Get(ctx, tourID)
	if err != nil {
		return nil, err
	}
	tour.Publish(authorID)
	err = service.TourRepo.UpdateTour(ctx, tour)
	if err != nil {
		return nil, err
	}
	return tour, nil
}

func (service *TourService) Archive(ctx context.Context, authorID, tourID int) (*model.Tour, error) {
	tour, err := service.Get(ctx, tourID)
	if err != nil {
		return nil, err
	}
	tour.Archive(authorID)
	err = service.TourRepo.UpdateTour(ctx, tour)
	if err != nil {
		return nil, err
	}
	return tour, nil
}
