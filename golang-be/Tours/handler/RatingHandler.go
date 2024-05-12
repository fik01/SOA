package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"tours/model"
	"tours/service"
)

type RatingHandler struct {
	RatingService *service.RatingService
}

func (handler *RatingHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var rating model.Rating
	ctx := req.Context()
	err := json.NewDecoder(req.Body).Decode(&rating)

	if err != nil {
		log.Println("Error while parsing rating json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.RatingService.Create(ctx, &rating)

	if err != nil {
		log.Println("Error while creating tour")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	writer.WriteHeader(http.StatusCreated)
}

func (handler *RatingHandler) GetById(writer http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	var rating *model.Rating

	id, err := strconv.Atoi(req.URL.Query().Get("id"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	rating, err = handler.RatingService.GetById(ctx, id)

	if err != nil {
		log.Println("Error while getting rating")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(rating)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}

}

func (handler *RatingHandler) Update(writer http.ResponseWriter, req *http.Request) {
	var rating model.Rating
	ctx := req.Context()
	err := json.NewDecoder(req.Body).Decode(&rating)

	if err != nil {
		log.Println("Error while parsing rating json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.RatingService.Update(ctx, &rating)

	if err != nil {
		log.Println("Error while updating tour")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func (handler *RatingHandler) GetByTourId(writer http.ResponseWriter, req *http.Request) {
	var rating []*model.Rating

	id, err := strconv.Atoi(req.URL.Query().Get("tourId"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	ctx := req.Context()
	rating, err = handler.RatingService.GetByTourId(ctx, id)

	if err != nil {
		log.Println("Error while getting rating")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(rating)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}

}

func (handler *RatingHandler) GetByPersonIdAndTourId(writer http.ResponseWriter, req *http.Request) {

	tourId, tErr := strconv.Atoi(req.URL.Query().Get("tourId"))
	personId, pErr := strconv.Atoi(req.URL.Query().Get("personId"))

	if tErr != nil || pErr != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	ctx := req.Context()
	rating, err := handler.RatingService.GetByTourIdAndPersonId(ctx, tourId, personId)

	if err != nil {
		log.Println("Error while getting rating")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(rating)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}
}
