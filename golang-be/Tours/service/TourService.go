package service

import (
	"tours/model"
	"tours/repo"
)

type TourService struct {
	TourRepo *repo.TourRepository
}

func (service *TourService) Create(tour *model.Tour) (*model.Tour, error) {
	newTour, err := service.TourRepo.CreateNewTour(tour)
	if err != nil {
		return nil, err
	}
	return newTour, nil
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

func (service *TourService) GetAllByAuthorId(authorId int) ([]model.Tour, error) {
	var tours []model.Tour
	tours, err := service.TourRepo.GetAllByAuthorId(authorId)
	if err != nil {
		return nil, err
	}
	return tours, nil
}

func (service *TourService) Get(id int) (model.Tour, error) {
	var tour model.Tour
	tour, err := service.TourRepo.Get(id)
	if err != nil {
		return tour, err
	}
	return tour, nil
}
