package model

import (
	"errors"
)

type TourKeyPoint struct {
	Id             int     `bson:"_id, omitempty"`
	Name           string  `bson:"name"`
	Description    string  `bson:"description"`
	Longitude      float64 `bson:"longitude"`
	Latitude       float64 `bson:"latitude"`
	Image          string  `bson:"image"`
	TourID         int     `bson:"tour_id"`
	Secret         string  `bson:"secret"`
	PositionInTour int     `bson:"position_in_tour"`
	PublicPointID  int     `bson:"public_point_id"`
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
