package handler

import (
	"encoding/json"
	"net/http"

	"followers/model"
	"followers/service"
)

type FollowerHandler struct {
	FollowerService *service.FollowerService
}

func (h *FollowerHandler) CreateFollowerHandler(w http.ResponseWriter, r *http.Request) {
	var follower model.Follower
	if err := json.NewDecoder(r.Body).Decode(&follower); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	if err := h.FollowerService.CreateFollower(follower); err != nil {
		http.Error(w, "Failed to create follower: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
