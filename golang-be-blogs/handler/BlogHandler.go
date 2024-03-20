package handler

import (
	"database-example/model"
	"database-example/service"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type BlogHandler struct {
	BlogService *service.BlogService
}

func (handler *BlogHandler) GetAll(writer http.ResponseWriter, req *http.Request) {

	blogs, err := handler.BlogService.GetAll()
	if err != nil {
		log.Println("Error while getting blogs:", err)
		http.Error(writer, "Failed to retrieve blogs", http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(blogs)
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

func (handler *BlogHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var blog model.BlogPage

	err := json.NewDecoder(req.Body).Decode(&blog)
	fmt.Println(blog)
	if err != nil {
		log.Println("Error while parsing blog json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return 
	}

	err = handler.BlogService.Create(&blog)
	if err != nil {
		log.Println("Error while creating blog")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	createdBlog, err := json.Marshal(&blog)
	if err != nil {
		log.Println("Error while encoding blog to JSON")
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	writer.WriteHeader(http.StatusCreated)
	writer.Write(createdBlog)
}