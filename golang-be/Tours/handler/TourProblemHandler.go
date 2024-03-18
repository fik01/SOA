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

type TourProblemHandler struct {
	TourProblemService *service.TourProblemService
}

func (handler *TourProblemHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var problem model.TourProblem
	err := json.NewDecoder(req.Body).Decode(&problem)
	fmt.Println(req.Body)
	fmt.Println(&problem)
	if err != nil {
		log.Println("Error while parsing tour problem json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.TourProblemService.Create(&problem)
	if err != nil {
		log.Println("Error while creating tour problem")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	createdTourProblem, err := json.Marshal(&problem)
	if err != nil {
		log.Println("Error while encoding tour problem to JSON")
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusCreated)
	writer.Write(createdTourProblem)
}

func (handler *TourProblemHandler) Update(writer http.ResponseWriter, req *http.Request) {
	var tourProblem model.TourProblem

	err := json.NewDecoder(req.Body).Decode(&tourProblem)

	if err != nil {
		log.Println("Error while parsing tour problem json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.TourProblemService.Update(&tourProblem)

	if err != nil {
		log.Println("Error while updating tour problem")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	updatedTourProblem, err := json.Marshal(&tourProblem)
	if err != nil {
		log.Println("Error while encoding tour problem to JSON")
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusCreated)
	writer.Write(updatedTourProblem)
}

func (handler *TourProblemHandler) GetByTouristId(writer http.ResponseWriter, req *http.Request) {
	var tourProblems *[]model.TourProblem

	touristId, err := strconv.Atoi(req.URL.Query().Get("touristId"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	tourProblems, err = handler.TourProblemService.GetByTouristId(touristId)

	if err != nil {
		log.Println("Error while getting tour key points")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(tourProblems)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}

}

func (handler *TourProblemHandler) GetByAuthorId(writer http.ResponseWriter, req *http.Request) {
	var tourProblems *[]model.TourProblem

	authorId, err := strconv.Atoi(req.URL.Query().Get("authorId"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	tourProblems, err = handler.TourProblemService.GetByAuthorId(authorId)

	if err != nil {
		log.Println("Error while getting tour key points")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(tourProblems)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}

}
