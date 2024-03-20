package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"tours/model"
	"tours/service"
)

type EquipmentHandler struct {
	EquipmentService *service.EquipmentService
}

func (handler *EquipmentHandler) Get(writer http.ResponseWriter, req *http.Request) {
	equipment, err := handler.EquipmentService.Get()

	if err != nil {
		log.Println("Error while getting rating")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(equipment)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}
}

func (handler *EquipmentHandler) GetById(writer http.ResponseWriter, req *http.Request) {

	id, err := strconv.Atoi(req.URL.Query().Get("id"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	equipment, err := handler.EquipmentService.GetById(id)

	if err != nil {
		log.Println("Error while getting rating")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(equipment)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}
}

func (handler *EquipmentHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var equipment model.Equipment

	err := json.NewDecoder(req.Body).Decode(&equipment)

	if err != nil {
		log.Println("Error while parsing rating json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.EquipmentService.Create(&equipment)

	if err != nil {
		log.Println("Error while creating tour")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	writer.WriteHeader(http.StatusCreated)
}

func (handler *EquipmentHandler) Update(writer http.ResponseWriter, req *http.Request) {
	var equipment model.Equipment

	err := json.NewDecoder(req.Body).Decode(&equipment)

	if err != nil {
		log.Println("Error while parsing rating json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.EquipmentService.Update(&equipment)

	if err != nil {
		log.Println("Error while updating tour")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func (handler *EquipmentHandler) Delete(writer http.ResponseWriter, req *http.Request) {

	id, err := strconv.Atoi(req.URL.Query().Get("id"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = handler.EquipmentService.Delete(id)

	if err != nil {
		log.Println("Error while deleting tour")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	writer.WriteHeader(http.StatusOK)
}
