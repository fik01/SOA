package model

import (
	"errors"

	"gorm.io/gorm"
)

type TourKeyPoint struct {
	gorm.Model
	ID             int `gorm:"primaryKey"`
	Name           string
	Description    string
	Longitude      float64
	Latitude       float64
	Image          string
	TourID         int
	Secret         string
	PositionInTour int
	PublicPointId  int
}

func (tourKeyPoint *TourKeyPoint) validate() error {
	if tourKeyPoint.Name == "" {
		return errors.New("invalid name")
	}
	if tourKeyPoint.Description == "" {
		return errors.New("invalid description")
	}
	if tourKeyPoint.Latitude > 90 || tourKeyPoint.Latitude < -90 {
		return errors.New("invalid latitude")
	}
	if tourKeyPoint.Longitude > 180 || tourKeyPoint.Latitude < -180 {
		return errors.New("invalid longitude")
	}

	if tourKeyPoint.PositionInTour <= 0 {
		return errors.New("invalid keypoint tour position")
	}

	return nil
}
