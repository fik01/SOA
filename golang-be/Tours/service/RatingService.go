package service

import (
	"tours/model"
	"tours/repo"
)

type RatingService struct {
	RatingRepo *repo.CRUDRepository[model.Rating]
}

func (service *RatingService) Create(rating *model.Rating) error {
	err := service.RatingRepo.Create(rating)
	if err != nil {
		return err
	}
	return nil
}

func (service *RatingService) GetById(id int) (*model.Rating, error) {
	rating, err := service.RatingRepo.GetById(id)
	if err != nil {
		return nil, err
	}
	return rating, nil
}

func (service *RatingService) GetByTourId(id int) (*[]model.Rating, error) {
	rating, err := service.RatingRepo.Where("tour_id = ?", id)
	if err != nil {
		return nil, err
	}
	return rating, nil
}

func (service *RatingService) Update(rating *model.Rating) error {
	err := service.RatingRepo.Update(rating)
	if err != nil {
		return err
	}
	return nil
}

func (service *RatingService) GetByPersonIdAndTourId(tourId int, personId int) (*[]model.Rating, error) {
	rating, err := service.RatingRepo.Where("tour_id = ? AND person_id = ?", tourId, personId)
	if err != nil {
		return nil, err
	}
	return rating, nil
}
