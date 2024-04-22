package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"followers/model"
	"followers/service"

	"github.com/gorilla/mux"
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

func (h *FollowerHandler) DeleteFollowerHandler(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	followerID, err := strconv.ParseInt(vars["followerId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid follower ID", http.StatusBadRequest)
		return
	}
	followedID, err := strconv.ParseInt(vars["followedId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid followed ID", http.StatusBadRequest)
		return
	}

	err = h.FollowerService.DeleteFollower(followerID, followedID)
	if err != nil {
		http.Error(w, "Failed to delete follower: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *FollowerHandler) GetFollowingsHandler(w http.ResponseWriter, r *http.Request) {
	followerIDStr := mux.Vars(r)["followerId"]

	followerID, err := strconv.ParseInt(followerIDStr, 10, 64)
	if err != nil {
		http.Error(w, "Invalid or missing follower ID", http.StatusBadRequest)
		return
	}

	followings, err := h.FollowerService.GetFollowings(followerID)
	if err != nil {
		http.Error(w, "Failed to get followings: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(followings)
}
