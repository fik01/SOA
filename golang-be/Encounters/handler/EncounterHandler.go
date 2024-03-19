package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"encounters.xws.com/model"
	"encounters.xws.com/service"
	"github.com/gorilla/mux"
)

type UserExperienceHandler struct {
	UserExperienceService *service.UserExperienceService
}

type ChallengeExecutionHandler struct {
	ChallengeExecutionService *service.ChallengeExecutionService
}

func (handler *UserExperienceHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var userExperience model.UserExperience
	err := json.NewDecoder(req.Body).Decode(&userExperience)
	if err != nil {
		log.Println("Error while parsing userExperience json")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Println(&userExperience)
	err = handler.UserExperienceService.Create(&userExperience)
	if err != nil {
		log.Println("Error while creating userExperience")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}
	writer.WriteHeader(http.StatusCreated)
	writer.Header().Set("Content-Type", "application/json")
}

func (handler *UserExperienceHandler) AddXP(writer http.ResponseWriter, req *http.Request) {
	id := mux.Vars(req)["id"]
	xp, _ := strconv.Atoi(mux.Vars(req)["xp"])
	userExperience, err := handler.UserExperienceService.AddXP(id, xp)
	writer.Header().Set("Content-Type", "application/json")
	if err != nil {
		log.Println("Error while adding xp")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}
	writer.WriteHeader(http.StatusOK)
	json.NewEncoder(writer).Encode(userExperience)
}

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

	log.Println("Challenge execution created successfully!")
	writer.WriteHeader(http.StatusCreated)

	writer.Header().Set("Content-Type", "application/json")
	json.NewEncoder(writer).Encode(challengeExecution)
}

func (handler *ChallengeExecutionHandler) Update(writer http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		log.Println("Invalid ID:", err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	var challengeExecution model.ChallengeExecution
	err = json.NewDecoder(req.Body).Decode(&challengeExecution)
	if err != nil {
		log.Println("Error decoding request body:", err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	challengeExecution.Id = id

	err = handler.ChallengeExecutionService.Update(&challengeExecution)
	if err != nil {
		log.Println("Error while updating challenge execution:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
	log.Println("Challenge execution finished successfully!")
	writer.WriteHeader(http.StatusOK)
}

func (handler *ChallengeExecutionHandler) Delete(writer http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	id, _ := strconv.ParseInt(vars["id"], 10, 64)

	err := handler.ChallengeExecutionService.Delete(id)
	if err != nil {
		log.Println("Error while deleting challenge execution:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Println("Challenge execution removed successfully!")
	writer.WriteHeader(http.StatusOK)
}

func (handler *ChallengeExecutionHandler) GetAll(writer http.ResponseWriter, req *http.Request) {

	log.Println("GetAll successful!")
	result, err := handler.ChallengeExecutionService.GetAll()
	if err != nil {
		log.Println("Error getting challenge executions:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(writer).Encode(result); err != nil {
		log.Println("Error encoding JSON:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}
}
