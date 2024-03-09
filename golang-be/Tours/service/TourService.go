package service

import (
	"tours/model"
	"tours/repo"
)

type TourService struct {
	TourRepo *repo.TourRepository
}

func (service *TourService) Create(tour *model.Tour) error {
	err := service.TourRepo.CreateNewTour(tour)
	if err != nil {
		return err
	}
	return nil
}

func (service *TourService) Update(tour *model.Tour) error {
	err := service.TourRepo.UpdateTour(tour)
	if err != nil {
		return err
	}
	return nil
}

func (service *TourService) GetAll() ([]model.Tour, error) {
	var tours []model.Tour
	tours, err := service.TourRepo.GetAll()
	if err != nil {
		return nil, err
	}

	return tours, nil
}
