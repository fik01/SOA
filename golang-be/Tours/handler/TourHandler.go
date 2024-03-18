package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"tours/model"
	"tours/service"
)

type TourHandler struct {
	TourService *service.TourService
}

func (handler *TourHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var tour model.Tour
	err := json.NewDecoder(req.Body).Decode(&tour)
	if err != nil {
		log.Println("Error while parsing tour json")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println(&tour)

	newTour, err := handler.TourService.Create(&tour)
	if err != nil {
		log.Println("Error while creating tour")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}
	createdTour, err := json.Marshal(&newTour)
	if err != nil {
		log.Println("Error while encoding tour to JSON")
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	writer.WriteHeader(http.StatusCreated)
	writer.Write(createdTour)
}

func (handler *TourHandler) Update(writer http.ResponseWriter, req *http.Request) {
	var tour model.Tour
	err := json.NewDecoder(req.Body).Decode(&tour)
	if err != nil {
		log.Println("Error while parsing tour JSON:", err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.TourService.Update(&tour)
	if err != nil {
		log.Println("Error while updating tour:", err)
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(tour)
	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}

func (handler *TourHandler) GetAll(writer http.ResponseWriter, req *http.Request) {
	tours, err := handler.TourService.GetAll()
	if err != nil {
		http.Error(writer, "Failed to fetch tours", http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tours)
	if err != nil {

		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}
	writer.Header().Set("Content-Type", "application/json")

	writer.Write(jsonData)
}

func (handler *TourHandler) GetAllByAuthorId(writer http.ResponseWriter, req *http.Request) {
	idStr := req.URL.Query().Get("author_id")
	authorID, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(writer, "Invalid author ID", http.StatusBadRequest)
		return
	}

	tours, err := handler.TourService.GetAllByAuthorId(authorID)
	if err != nil {
		http.Error(writer, "Failed to fetch tours", http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tours)
	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}

func (handler *TourHandler) Get(writer http.ResponseWriter, req *http.Request) {
	idStr := req.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(writer, "Invalid author ID", http.StatusBadRequest)
		return
	}

	tours, err := handler.TourService.Get(id)
	if err != nil {
		http.Error(writer, "Failed to fetch tours", http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tours)
	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}

func (handler *TourHandler) Publish(writer http.ResponseWriter, req *http.Request) {
	idStr := req.URL.Query().Get("tourId")
	tourId, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(writer, "Invalid tour ID", http.StatusBadRequest)
		return
	}
	idStr = req.URL.Query().Get("authorId")
	authorId, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(writer, "Invalid author ID", http.StatusBadRequest)
		return
	}

	tour, err := handler.TourService.Publish(authorId, tourId)
	if err != nil {
		http.Error(writer, "Failed to publish tour", http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(&tour)
	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)

}

func (handler *TourHandler) Archive(writer http.ResponseWriter, req *http.Request) {
	idStr := req.URL.Query().Get("tourId")
	tourId, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(writer, "Invalid tour ID", http.StatusBadRequest)
		return
	}
	idStr = req.URL.Query().Get("authorId")
	authorId, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(writer, "Invalid author ID", http.StatusBadRequest)
		return
	}

	tour, err := handler.TourService.Archive(authorId, tourId)
	if err != nil {
		http.Error(writer, "Failed to archive tour", http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(&tour)
	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)

}
