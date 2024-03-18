package handler

import (
	"database-example/model"
	"database-example/service"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

type CommentHandler struct {
	CommentService *service.CommentService
}

func (handler *CommentHandler) GetByBlogId(writer http.ResponseWriter, req *http.Request) {

	vars := mux.Vars(req)
	idStr := vars["id"]
	id, err := strconv.Atoi(idStr)
	fmt.Println(id)
	
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

func (handler *CommentHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var comment model.Comment

	err := json.NewDecoder(req.Body).Decode(&comment)
	fmt.Println(comment)
	if err != nil {
		log.Println("Error while parsing rating json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return 
	}

	err = handler.CommentService.Create(&comment)
	if err != nil {
		log.Println("Error while creating comment")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	createdComment, err := json.Marshal(&comment)
	if err != nil {
		log.Println("Error while encoding tour to JSON")
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	writer.WriteHeader(http.StatusCreated)
	writer.Write(createdComment)
}