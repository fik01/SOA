package service

import (
	"tours/model"
	"tours/repo"
)

type TourProblemService struct {
	TourProblemRepo *repo.CRUDRepository[model.TourProblem]
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
