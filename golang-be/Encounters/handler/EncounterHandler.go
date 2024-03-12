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

