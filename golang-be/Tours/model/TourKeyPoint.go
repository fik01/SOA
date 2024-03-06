package model

import "errors"

type TourKeyPoint struct {
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
	if tourKeyPoint.Latitude == nil || tourKeyPoint.Longitude == nil {
		return errors.New("invalid coordinates")
	}
	if tourKeyPoint.TourID == nil {
		return errors.New("invalid tourID")
	}
	if tourKeyPoint.PositionInTour == nil {
		return errors.New("invalid keypoint tour position")
	}

	return nil
}
