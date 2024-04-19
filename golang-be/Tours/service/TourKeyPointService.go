package service

import (
	"context"
	"tours/model"
	"tours/repo"
)

type TourKeyPointService struct {
	TourKeyPointRepo *repo.TourKeyPointRepository
}

func (service *TourKeyPointService) Create(ctx context.Context, tourKeyPoint *model.TourKeyPoint) (*model.TourKeyPoint, error) {
	customID, err := service.TourKeyPointRepo.GenerateCustomID(ctx)
	if err != nil {
		return nil, err
	}

	tourKeyPoint.Id = customID
	newTour, err := service.TourKeyPointRepo.Create(ctx, tourKeyPoint)
	if err != nil {
		return nil, err
	}
	return newTour, nil
}

func (service *TourKeyPointService) Update(ctx context.Context, tourKeyPoint *model.TourKeyPoint) error {
	err := service.TourKeyPointRepo.Update(ctx, tourKeyPoint)
	if err != nil {
		return err
	}
	return nil
}

/*func (service *TourKeyPointService) DeleteById(tourKeyPointId int) error {
	err := service.TourKeyPointRepo.DeleteById(tourKeyPointId)
	if err != nil {
		return err
	}
	return nil
}*/

func (service *TourKeyPointService) Get(ctx context.Context, tourKeyPointId int) (*model.TourKeyPoint, error) {
	var tourKeyPoint *model.TourKeyPoint
	tourKeyPoint, err := service.TourKeyPointRepo.Get(ctx, tourKeyPointId)
	if err != nil {
		return nil, err
	}
	return tourKeyPoint, err
}

func (service *TourKeyPointService) GetAll(ctx context.Context) ([]model.TourKeyPoint, error) {
	var tourKeyPoints []model.TourKeyPoint
	tourKeyPoints, err := service.TourKeyPointRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}
	return tourKeyPoints, nil
}

func (service *TourKeyPointService) GetByTourId(ctx context.Context, tourId int) ([]model.TourKeyPoint, error) {
	var tourKeyPoints []model.TourKeyPoint
	tourKeyPoints, err := service.TourKeyPointRepo.GetByTourId(ctx, tourId)
	if err != nil {
		return nil, err
	}
	return tourKeyPoints, nil
}
