package service

import (
	"database-example/model"
	"database-example/repo"
)

type BlogService struct {
	BlogRepo *repo.CRUDRepository[model.BlogPage]
}

func (service *BlogService) Create(blog *model.BlogPage) error {

	err := service.BlogRepo.Create(blog)
	if err != nil {
		return err
	}
	return nil
}

func (service *BlogService) GetAll() (*[]model.BlogPage, error) {
	blogs, err := service.BlogRepo.GetAll()

	if err != nil {
		return nil, err
	}
	return blogs, nil
}