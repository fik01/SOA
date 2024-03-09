package model

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TransportationType int

type TourDuration struct {
	gorm.Model
	TourID         uuid.UUID
	TimeInSeconds  int
	Transportation TransportationType
}

func NewTourDuration(timeInSeconds int, transpotation TransportationType) TourDuration {
	return TourDuration{TimeInSeconds: timeInSeconds, Transportation: transpotation}
}

const (
	Walking TransportationType = iota
	Bicycle
	Car
)
