package service

import (
	"context"
	"database-example/model"
	"database-example/repo"
)

type BlogService struct {
	BlogRepo *repo.CRUDRepository[model.BlogPage]
}

func (service *BlogService) Create(ctx context.Context,blog *model.BlogPage) error {

	err := service.BlogRepo.Create(ctx,blog)
	if err != nil {
		return err
	}
	return nil
}

func (service *BlogService) GetAll(ctx context.Context) (*[]model.BlogPage, error) {
	blogs, err := service.BlogRepo.GetAll(ctx)

	if err != nil {
		return nil, err
	}
	return blogs, nil
}