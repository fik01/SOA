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

func (service *CommentService) GetByBlogId(ctx context.Context,Id int) (*[]model.Comment, error) {
    query := bson.M{"blogid": Id}
    fmt.Println("Query:", query)

    comments, err := service.CommentRepo.Where(ctx, query)
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

func (service *CommentService) Update(ctx context.Context,comment *model.Comment) error {
	err := service.CommentRepo.Update(ctx,comment)
	if err != nil {
		return err
	}
	return nil
}

func (service *CommentService) DeleteById(ctx context.Context,id int) error {
	err := service.CommentRepo.Delete(ctx,id)
	if err != nil {
		return err
	}
	return nil
}