package model

import (
	"errors"
	"gorm.io/gorm"
)

type Position struct {
	gorm.Model
	ID        int `gorm:"primaryKey"`
	Latitude  float64
	Longitude float64
	TouristID int
}

func (position *Position) validate() error {
	if position.Latitude > 90 || position.Latitude < -90 {
		return errors.New("invalid latitude")
	}
	if position.Longitude > 180 || position.Longitude < -180 {
		return errors.New("invalid longitude")
	}
	return nil
}
