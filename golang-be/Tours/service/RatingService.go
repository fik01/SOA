package service

import (
	"context"
	"tours/model"
	"tours/repo"
)

type RatingService struct {
	RatingRepo *repo.RatingRepository
}

func (service *RatingService) Create(ctx context.Context, rating *model.Rating) error {
	customID, err := service.RatingRepo.GenerateCustomID(ctx)
	if err != nil {
		return nil
	}

	rating.ID = customID
	_, err = service.RatingRepo.Create(ctx, rating)
	if err != nil {
		return err
	}
	return nil
}

func (service *RatingService) GetById(ctx context.Context, id int) (*model.Rating, error) {
	rating, err := service.RatingRepo.Get(ctx, id)
	if err != nil {
		return nil, err
	}
	return rating, nil
}

func (service *RatingService) GetByTourId(ctx context.Context, id int) ([]*model.Rating, error) {
	rating, err := service.RatingRepo.GetByTourId(ctx, id)
	if err != nil {
		return nil, err
	}
	return rating, nil
}

func (service *RatingService) Update(ctx context.Context, rating *model.Rating) error {
	err := service.RatingRepo.Update(ctx, rating)
	if err != nil {
		return err
	}
	return nil
}

func (service *RatingService) GetByTourIdAndPersonId(ctx context.Context, tourId int, personId int) (*model.Rating, error) {
	rating, err := service.RatingRepo.GetByTourIdAndPersonId(ctx, tourId, personId)
	if err != nil {
		return nil, err
	}
	return rating, nil
}
