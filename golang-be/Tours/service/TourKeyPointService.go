package service

import (
	"tours/model"
	"tours/repo"
)

type TourKeyPointService struct {
	TourKeyPointRepo *repo.CRUDRepository[model.TourKeyPoint]
}

func (service *TourKeyPointService) Create(tourKeyPoint *model.TourKeyPoint) error {
	err := service.TourKeyPointRepo.Create(tourKeyPoint)
	if err != nil {
		return err
	}
	return nil
}

func (service *TourKeyPointService) Update(tourKeyPoint *model.TourKeyPoint) error {
	err := service.TourKeyPointRepo.Update(tourKeyPoint)
	if err != nil {
		return err
	}
	return nil
}

func (service *TourKeyPointService) DeleteById(tourKeyPointId int) error {
	err := service.TourKeyPointRepo.DeleteById(tourKeyPointId)
	if err != nil {
		return err
	}
	return nil
}

func (service *TourKeyPointService) Get(tourKeyPointId int) (*model.TourKeyPoint, error) {
	var tourKeyPoint *model.TourKeyPoint
	tourKeyPoint, err := service.TourKeyPointRepo.GetById(tourKeyPointId)
	if err != nil {
		return nil, err
	}
	return tourKeyPoint, err
}

func (service *TourKeyPointService) GetAll() (*[]model.TourKeyPoint, error) {
	var tourKeyPoints *[]model.TourKeyPoint
	tourKeyPoints, err := service.TourKeyPointRepo.GetAll()
	if err != nil {
		return nil, err
	}
	return tourKeyPoints, nil
}

func (service *TourKeyPointService) GetByTourId(tourId int) (*[]model.TourKeyPoint, error) {
	var tourKeyPoints *[]model.TourKeyPoint
	tourKeyPoints, err := service.TourKeyPointRepo.Where("tour_id = ?", tourId)
	if err != nil {
		return nil, err
	}
	return tourKeyPoints, nil
}
