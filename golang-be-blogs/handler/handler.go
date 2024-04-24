package handler

import (
	"database-example/model"
	"database-example/repo"
	"database-example/service"

	"go.mongodb.org/mongo-driver/mongo"
)

type Handler struct {
	CommentHandler *CommentHandler
	BlogHandler *BlogHandler
}

func NewHandler(db *mongo.Database) *Handler {
	handler := new(Handler)

	commentRepo := &repo.CRUDRepository[model.Comment]{DatabaseConnection: db, 	CollectionName: "comments", PrimaryKeyField: "Id"}
	commentService := &service.CommentService{CommentRepo: commentRepo}
	handler.CommentHandler = &CommentHandler{CommentService: commentService}

	blogRepo := &repo.CRUDRepository[model.BlogPage]{DatabaseConnection: db, CollectionName: "blog_pages", PrimaryKeyField: "Id"}
	blogService := &service.BlogService{BlogRepo: blogRepo}
	handler.BlogHandler = &BlogHandler{BlogService: blogService}

	return handler
}