package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"tours/model"
	"tours/service"
)

type PositionSimulatorHandler struct {
	PositionSimulatorService *service.PositionSimulatorService
}

func (handler *PositionSimulatorHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var position model.Position

	err := json.NewDecoder(req.Body).Decode(&position)

	if err != nil {
		log.Println("Error while parsing rating json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	ctx := req.Context()
	err = handler.PositionSimulatorService.Create(ctx, &position)

	if err != nil {
		log.Println("Error while creating position simulator")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	writer.WriteHeader(http.StatusCreated)
}

func (handler *PositionSimulatorHandler) Update(writer http.ResponseWriter, req *http.Request) {
	var position model.Position

	err := json.NewDecoder(req.Body).Decode(&position)

	if err != nil {
		log.Println("Error while parsing rating json")
		log.Println(err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	ctx := req.Context()
	err = handler.PositionSimulatorService.Update(ctx, &position)

	if err != nil {
		log.Println("Error while updating position simulator")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	writer.WriteHeader(http.StatusOK)
}

func (handler *PositionSimulatorHandler) GetByTouristId(writer http.ResponseWriter, req *http.Request) {
	id, err := strconv.Atoi(req.URL.Query().Get("touristId"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	ctx := req.Context()
	position, err := handler.PositionSimulatorService.GetByTouristId(ctx, id)

	if err != nil {
		log.Println("Error while getting position")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(position)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}
}

func (handler *PositionSimulatorHandler) GetById(writer http.ResponseWriter, req *http.Request) {
	id, err := strconv.Atoi(req.URL.Query().Get("id"))

	if err != nil {
		log.Println("Error while parsing query params")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	ctx := req.Context()
	position, err := handler.PositionSimulatorService.GetById(ctx, id)

	if err != nil {
		log.Println("Error while getting position")
		writer.WriteHeader(http.StatusExpectationFailed)
		return
	}

	jsonData, err := json.Marshal(position)

	if err != nil {
		http.Error(writer, "Failed to marshal JSON", http.StatusInternalServerError)
	}

	writer.Header().Set("Content-Type", "application/json")
	_, err = writer.Write(jsonData)

	if err != nil {
		http.Error(writer, "Failed to write JSON data!", http.StatusInternalServerError)
	}
}
