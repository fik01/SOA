package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"tours/model"
	"tours/service"
)

type TourHandler struct {
	TourService *service.TourService
}

func (handler *TourHandler) Create(writer http.ResponseWriter, req *http.Request) {
	var tour model.Tour
	err := json.NewDecoder(req.Body).Decode(&tour)
	if err != nil {
		log.Println("Error while parsing tour JSON:", err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	ctx := req.Context()
	newTour, err := handler.TourService.Create(ctx, &tour)
	if err != nil {
		log.Println("Error while creating tour:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(newTour)
	if err != nil {
		log.Println("Error while encoding tour to JSON:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusCreated)
	writer.Write(jsonData)
}

func (handler *TourHandler) Update(writer http.ResponseWriter, req *http.Request) {
	var tour model.Tour
	err := json.NewDecoder(req.Body).Decode(&tour)
	if err != nil {
		log.Println("Error while parsing tour JSON:", err)
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	ctx := req.Context()
	err = handler.TourService.Update(ctx, &tour)
	if err != nil {
		log.Println("Error while updating tour:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tour)
	if err != nil {
		log.Println("Error while encoding tour to JSON:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}

func (handler *TourHandler) GetAll(writer http.ResponseWriter, req *http.Request) {
	ctx := req.Context()
	tours, err := handler.TourService.GetAll(ctx)
	if err != nil {
		log.Println("Error while fetching tours:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tours)
	if err != nil {
		log.Println("Error while encoding tours to JSON:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}

func (handler *TourHandler) GetAllByAuthorID(writer http.ResponseWriter, req *http.Request) {
	idStr := req.URL.Query().Get("author_id")
	authorID, err := strconv.Atoi(idStr)
	if err != nil {
		log.Println("Invalid author ID:", err)
		http.Error(writer, "Invalid author ID", http.StatusBadRequest)
		return
	}

	ctx := req.Context()
	tours, err := handler.TourService.GetAllByAuthorID(ctx, authorID)
	if err != nil {
		log.Println("Error while fetching tours:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tours)
	if err != nil {
		log.Println("Error while encoding tours to JSON:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}

func (handler *TourHandler) Get(writer http.ResponseWriter, req *http.Request) {
	idStr := req.URL.Query().Get("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		log.Println("Invalid tour ID:", err)
		http.Error(writer, "Invalid tour ID", http.StatusBadRequest)
		return
	}

	ctx := req.Context()
	tour, err := handler.TourService.Get(ctx, id)
	if err != nil {
		log.Println("Error while fetching tour:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tour)
	if err != nil {
		log.Println("Error while encoding tour to JSON:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}

func (handler *TourHandler) Publish(writer http.ResponseWriter, req *http.Request) {
	tourIDStr := req.URL.Query().Get("tourId")
	tourID, err := strconv.Atoi(tourIDStr)
	if err != nil {
		log.Println("Invalid tour ID:", err)
		http.Error(writer, "Invalid tour ID", http.StatusBadRequest)
		return
	}

	authorIDStr := req.URL.Query().Get("authorId")
	authorID, err := strconv.Atoi(authorIDStr)
	if err != nil {
		log.Println("Invalid author ID:", err)
		http.Error(writer, "Invalid author ID", http.StatusBadRequest)
		return
	}

	ctx := req.Context()
	tour, err := handler.TourService.Publish(ctx, authorID, tourID)
	if err != nil {
		log.Println("Error while publishing tour:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tour)
	if err != nil {
		log.Println("Error while encoding tour to JSON:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}

func (handler *TourHandler) Archive(writer http.ResponseWriter, req *http.Request) {
	tourIDStr := req.URL.Query().Get("tourId")
	tourID, err := strconv.Atoi(tourIDStr)
	if err != nil {
		log.Println("Invalid tour ID:", err)
		http.Error(writer, "Invalid tour ID", http.StatusBadRequest)
		return
	}

	authorIDStr := req.URL.Query().Get("authorId")
	authorID, err := strconv.Atoi(authorIDStr)
	if err != nil {
		log.Println("Invalid author ID:", err)
		http.Error(writer, "Invalid author ID", http.StatusBadRequest)
		return
	}

	ctx := req.Context()
	tour, err := handler.TourService.Archive(ctx, authorID, tourID)
	if err != nil {
		log.Println("Error while archiving tour:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	jsonData, err := json.Marshal(tour)
	if err != nil {
		log.Println("Error while encoding tour to JSON:", err)
		writer.WriteHeader(http.StatusInternalServerError)
		return
	}

	writer.Header().Set("Content-Type", "application/json")
	writer.Write(jsonData)
}
