package model

import (
	"gorm.io/gorm"
)

type TransportationType int

type TourDuration struct {
	gorm.Model
	TourID         int
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
