package app

import (
	"database-example/handler"

	"github.com/gorilla/mux"
)

func Route(router *mux.Router, handler *handler.Handler) {
	router.HandleFunc("/blog/blogComments", handler.CommentHandler.GetByBlogId).Methods("GET")
	router.HandleFunc("/blog/createComment", handler.CommentHandler.Create).Methods("POST")
}