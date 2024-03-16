package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"tours/model"
	"tours/service"
)

type TourKeyPointHandler struct {
	TourKeyPointService *service.TourKeyPointService
}

func (handler *TourKeyPointHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var tourKeyPoint model.TourKeyPoint
	err := json.NewDecoder(req.Body).Decode(&tourKeyPoint)
	if err != nil {
		log.Println("Error while parsing tour key point json")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.TourKeyPointService.Create(&tourKeyPoint)
	if err != nil {
		log.Println("Error while creating tour key point")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	createdTourKEyPoint, err := json.Marshal(&tourKeyPoint)
	if err != nil {
		log.Println("Error while encoding tour key point to JSON")
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusCreated)
	writer.Write(createdTourKEyPoint)
}

func (handler *TourKeyPointHandler) Update(writer http.ResponseWriter, req *http.Request) {
	var tourKeyPoint model.TourKeyPoint

	err := json.NewDecoder(req.Body).Decode(&tourKeyPoint)

	if err != nil {
		log.Println("Error while parsing tour key point json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.TourKeyPointService.Update(&tourKeyPoint)

	if err != nil {
		log.Println("Error while updating tour key point")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	updatedTourKeyPoint, err := json.Marshal(&tourKeyPoint)
	if err != nil {
		log.Println("Error while encoding tour key point to JSON")
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusCreated)
	writer.Write(updatedTourKeyPoint)
}

func (handler *TourKeyPointHandler) GetById(writer http.ResponseWriter, req *http.Request) {

	var tourKeyPoint *model.TourKeyPoint

	id, err := strconv.Atoi(req.URL.Query().Get("id"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	tourKeyPoint, err = handler.TourKeyPointService.Get(id)

	if err != nil {
		log.Println("Error while getting tour key point")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(tourKeyPoint)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}

}

func (handler *TourKeyPointHandler) GetByTourId(writer http.ResponseWriter, req *http.Request) {
	var tourKeyPoints *[]model.TourKeyPoint

	id, err := strconv.Atoi(req.URL.Query().Get("tourId"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	tourKeyPoints, err = handler.TourKeyPointService.GetByTourId(id)

	if err != nil {
		log.Println("Error while getting tour key points")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(tourKeyPoints)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}

}

func (handler *TourKeyPointHandler) Delete(writer http.ResponseWriter, req *http.Request) {

	id, err := strconv.Atoi(req.URL.Query().Get("tourKeyPointId"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.TourKeyPointService.DeleteById(id)

	if err != nil {
		log.Println("Error while updating tour key point")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	writer.WriteHeader(http.StatusOK)
}
