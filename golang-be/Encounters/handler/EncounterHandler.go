package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"encounters.xws.com/model"
	"encounters.xws.com/service"
)

type ChallengeExecutionHandler struct {
	ChallengeExecutionService *service.ChallengeExecutionService
}

/*
func (handler *ChallengeExecutionHandler) GetAll(writer http.ResponseWriter, req *http.Request) {
	page, _ := strconv.Atoi(req.URL.Query().Get("page"))
	pageSize, _ := strconv.Atoi(req.URL.Query().Get("pageSize"))

	result := handler.ChallengeExecutionService.GetPaged(page, pageSize)
	writer.Header().Set("Content-Type", "application/json")
	if result.Error != nil {
		log.Println("Error while getting challenge executions:", result.Error)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(writer).Encode(result)
}
*/

func (handler *ChallengeExecutionHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var challengeExecution model.ChallengeExecution
	err := json.NewDecoder(req.Body).Decode(&challengeExecution)
	if err != nil {
		log.Println("Error while parsing challenge execution json:", err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.ChallengeExecutionService.Create(&challengeExecution)
	if err != nil {
		log.Println("Error while creating challenge execution:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println("Challenge execution created successfully:", challengeExecution)
	writer.WriteHeader(http.StatusCreated)
	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(challengeExecution)
}

/*
func (handler *ChallengeExecutionHandler) Update(writer http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id, _ := strconv.Atoi(vars["id"])

	var challengeExecution model.ChallengeExecution
	err := json.NewDecoder(req.Body).Decode(&challengeExecution)
	if err != nil {
		log.Println("Error while parsing challenge execution json:", err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	challengeExecution.ID = id

	err = handler.ChallengeExecutionService.Update(&challengeExecution)
	if err != nil {
		log.Println("Error while updating challenge execution:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(challengeExecution)
}
*/

/*
func (handler *ChallengeExecutionHandler) Delete(writer http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id, _ := strconv.Atoi(vars["id"])

	err := handler.ChallengeExecutionService.Delete(id)
	if err != nil {
		log.Println("Error while deleting challenge execution:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.WriteHeader(http.StatusOK)
}
*/

/*
func (handler *ChallengeExecutionHandler) GetPagedByTour(writer http.ResponseWriter, req *http.Request) {
	var tour model.Tour
	err := json.NewDecoder(req.Body).Decode(&tour)
	if err != nil {
		log.Println("Error while parsing tour json:", err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	page, _ := strconv.Atoi(req.URL.Query().Get("page"))
	pageSize, _ := strconv.Atoi(req.URL.Query().Get("pageSize"))

	result := handler.ChallengeExecutionService.GetPagedByKeyPointIds(tour.KeyPoints, page, pageSize)
	writer.Header().Set("Content-Type", "application/json")
	if result.Error != nil {
		log.Println("Error while getting challenge executions by tour:", result.Error)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(writer).Encode(result)
}
*/

/*
func (handler *ChallengeExecutionHandler) GetPagedByTouristId(writer http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	touristID, _ := strconv.Atoi(vars["touristId"])

	page, _ := strconv.Atoi(req.URL.Query().Get("page"))
	pageSize, _ := strconv.Atoi(req.URL.Query().Get("pageSize"))

	result := handler.ChallengeExecutionService.GetPagedByTouristId(touristID, page, pageSize)
	writer.Header().Set("Content-Type", "application/json")
	if result.Error != nil {
		log.Println("Error while getting challenge executions by tourist ID:", result.Error)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	json.NewEncoder(writer).Encode(result)
}
*/
