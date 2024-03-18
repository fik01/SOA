package service

import (
	"tours/model"
	"tours/repo"
)

type TourProblemService struct {
	TourProblemRepo *repo.CRUDRepository[model.TourProblem]
	ToursRepo       *repo.TourRepository
}

func (service *TourProblemService) Create(problem *model.TourProblem) error {
	err := service.TourProblemRepo.Create(problem)
	if err != nil {
		return err
	}

	return nil
}

func (service *TourProblemService) Update(problem *model.TourProblem) error {
	err := service.TourProblemRepo.Update(problem)
	if err != nil {
		return err
	}
	return nil
}

func (service *TourProblemService) GetByTouristId(touristId int) (*[]model.TourProblem, error) {
	var tourProblems *[]model.TourProblem
	tourProblems, err := service.TourProblemRepo.Where("tourist_id = ?", touristId)
	if err != nil {
		return nil, err
	}
	return tourProblems, nil

}

func (service *TourProblemService) GetByAuthorId(authorId int) (*[]model.TourProblem, error) {
	tours, err := service.ToursRepo.GetAllByAuthorId(authorId)
	if err != nil {
		return nil, err
	}

	var tourProblems []model.TourProblem
	for _, tour := range tours {
		authorTour, err := service.TourProblemRepo.Where("tour_id = ?", tour.Id)
		if err != nil {
			return nil, err
		}

		tourProblems = append(tourProblems, *authorTour...)
	}

	return &tourProblems, nil
}
