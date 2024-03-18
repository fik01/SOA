package service

import (
	"database-example/model"
	"database-example/repo"
	"strconv"
	"time"
)

type CommentService struct {
	CommentRepo *repo.CRUDRepository[model.Comment]
}

func (service *CommentService) GetByBlogId(Id int) (*[]model.Comment, error) {
	query := "blog_id = " + strconv.Itoa(Id)

	comments, err := service.CommentRepo.Where(query)
	if err != nil {
		return nil, err
	}
	return comments, nil
}

func (service *CommentService) Create(comment *model.Comment) error {

	comment.CreationDate = time.Now()
	comment.LastEditDate = time.Now()

	err := service.CommentRepo.Create(comment)
	if err != nil {
		return err
	}
	return nil
}

func (service *CommentService) Update(comment *model.Comment) error {
	err := service.CommentRepo.Update(comment)
	if err != nil {
		return err
	}
	return nil
}

func (service *CommentService) DeleteById(id int) error {
	err := service.CommentRepo.DeleteById(id)
	if err != nil {
		return err
	}
	return nil
}