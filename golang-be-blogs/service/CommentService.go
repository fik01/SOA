package service

import (
	"context"
	"database-example/model"
	"database-example/repo"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
)

type CommentService struct {
	CommentRepo *repo.CRUDRepository[model.Comment]
}

func (service *CommentService) GetByBlogId(Id int) (*[]model.Comment, error) {
    query := bson.M{"blogid": Id}
    fmt.Println("Query:", query)

    comments, err := service.CommentRepo.Where(query)
    if err != nil {
        fmt.Println("Error:", err)
        return nil, err
    }
    return comments, nil
}

func (service *CommentService) Create(ctx context.Context,comment *model.Comment) error {

	comment.CreationDate = time.Now()
	comment.LastEditDate = time.Now()

	err := service.CommentRepo.Create(ctx,comment)
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
	err := service.CommentRepo.Delete(id)
	if err != nil {
		return err
	}
	return nil
}