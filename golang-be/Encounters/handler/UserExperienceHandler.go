package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"encounters/model"
	"encounters/service"
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
	id, err := strconv.Atoi(mux.Vars(req)["id"])
    if err != nil {
        http.Error(writer, "Invalid ID format", http.StatusBadRequest)
        return
    }

    xp, err := strconv.Atoi(mux.Vars(req)["xp"])
    if err != nil {
        http.Error(writer, "Invalid XP format", http.StatusBadRequest)
        return
    }

    userExperience, err := handler.UserExperienceService.AddXP(id, xp)
    writer.Header().Set("Content-Type", "application/json")

    if err != nil {
        log.Println("Error while adding XP:", err)
        return
    }

    writer.WriteHeader(http.StatusOK)
    json.NewEncoder(writer).Encode(userExperience)
}

func (handler *UserExperienceHandler) GetXPByUserId(writer http.ResponseWriter, req *http.Request) {
	id, err := strconv.Atoi(mux.Vars(req)["id"])
    if err != nil {
        http.Error(writer, "Invalid ID format", http.StatusBadRequest)
        return
    }

    userExperience, err := handler.UserExperienceService.GetByUserId(id)
    writer.Header().Set("Content-Type", "application/json")

    if err != nil {
        log.Println("Error while getting XP by user:", err)
        return
    }

    writer.WriteHeader(http.StatusOK)
    json.NewEncoder(writer).Encode(userExperience)
}

func (handler *UserExperienceHandler) Delete(writer http.ResponseWriter, req *http.Request) {
	id, err := strconv.Atoi(mux.Vars(req)["id"])
    if err != nil {
        http.Error(writer, "Invalid ID format", http.StatusBadRequest)
        return
    }

   err1 := handler.UserExperienceService.Delete(id)
   writer.Header().Set("Content-Type", "application/json")

    if err1 != nil {
        log.Println("Error while deleting:", err1)
        return
    }

    writer.WriteHeader(http.StatusOK)
    json.NewEncoder(writer).Encode(nil)
}