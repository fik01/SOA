package app

import (
	"database-example/handler"

	"github.com/gorilla/mux"
)

func Route(router *mux.Router, handler *handler.Handler) {
	router.HandleFunc("/blog/blogComments/{id}", handler.CommentHandler.GetByBlogId).Methods("GET")
	router.HandleFunc("/blog/createComment", handler.CommentHandler.Create).Methods("POST")
	router.HandleFunc("/blog/updateComment", handler.CommentHandler.Update).Methods("PUT")
	router.HandleFunc("/blog/deleteComment/{id}", handler.CommentHandler.Delete).Methods("DELETE")
}