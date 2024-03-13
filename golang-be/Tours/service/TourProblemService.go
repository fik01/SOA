package service

import (
	"tours/model"
	"tours/repo"
)

type TourProblemService struct {
	TourProblemRepo *repo.CRUDRepository[model.TourProblem]
}
