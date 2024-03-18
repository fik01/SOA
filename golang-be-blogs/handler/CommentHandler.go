package handler

import (
	"database-example/service"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

type CommentHandler struct {
	CommentService *service.CommentService
}

func (handler *CommentHandler) GetByBlogId(writer http.ResponseWriter, req *http.Request) {

	id, err := strconv.Atoi(req.URL.Query().Get("id"))
	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	comments, err := handler.CommentService.GetByBlogId(id)	
	if err != nil {
		log.Println("Error while getting comments:", err)
		http.Error(writer, "Failed to retrieve comments", http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(comments)
	if err != nil {
		log.Println("Error while marshalling JSON:", err)
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")

	_, err = writer.Write(jsonData)
	if err != nil {
		log.Println("Error while writing JSON data:", err)
		http.Error(writer, "Failed to write JSON data", http.StatusInternalServerError)
		return
	}
}