package handler

import (
	"database-example/model"
	"database-example/repo"
	"database-example/service"

	"gorm.io/gorm"
)

type Handler struct {
	CommentHandler *CommentHandler
	BlogHandler *BlogHandler
}

func NewHandler(db *gorm.DB) *Handler {
	handler := new(Handler)

	commentRepo := &repo.CRUDRepository[model.Comment]{DatabaseConnection: db}
	commentService := &service.CommentService{CommentRepo: commentRepo}
	handler.CommentHandler = &CommentHandler{CommentService: commentService}

	blogRepo := &repo.CRUDRepository[model.BlogPage]{DatabaseConnection: db}
	blogService := &service.BlogService{BlogRepo: blogRepo}
	handler.BlogHandler = &BlogHandler{BlogService: blogService}

	return handler
}