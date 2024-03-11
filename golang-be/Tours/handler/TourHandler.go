package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
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

	err = handler.TourService.Create(&tour)
	if err != nil {
		log.Println("Error while creating tour")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}
	createdTour, err := json.Marshal(&tour)
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

	// Call the service to update the tour
	err = handler.TourService.Update(&tour)
	if err != nil {
		log.Println("Error while updating tour:", err)
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	// Respond with HTTP status 200 OK
	writer.WriteHeader(http.StatusOK)
}

func (handler *TourHandler) GetAll(writer http.ResponseWriter, req *http.Request) {
	// Fetch all tours from the repository
	tours, err := handler.TourService.GetAll()
	if err != nil {
		// If there's an error, return a 500 Internal Server Error response
		http.Error(writer, "Failed to fetch tours", http.StatusInternalServerError)
		return
	}

	// Convert tours slice to JSON
	jsonData, err := json.Marshal(tours)
	if err != nil {
		// If there's an error while marshaling JSON, return a 500 Internal Server Error response
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
		return
	}

	// Set content type to JSON
	writer.Header().Set("Content-Type", "application/json")

	// Write JSON response with fetched tours to the client
	writer.Write(jsonData)
}
