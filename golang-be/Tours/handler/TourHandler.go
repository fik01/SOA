package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"tours/model"
	"tours/service"

	"github.com/google/uuid"
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
	tour.ID = uuid.New()
	fmt.Println(&tour)
	err = handler.TourService.Create(&tour)
	if err != nil {
		log.Println("Error while creating tour")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}
	writer.WriteHeader(http.StatusCreated)
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
