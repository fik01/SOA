package model

import (
	"errors"
	"time"

	"gorm.io/gorm"
)

type Rating struct {
	gorm.Model
	ID               int         `bson:"_id,omitempty"`
	TourID           int         `bson:"TourId"`
	PersonID         int         `bson:"PersonId"`
	Mark             int         `bson:"Mark"`
	Comment          string      `bson:"Comment"`
	DateOfVisit      time.Time   `bson:"DateOfVisit"`
	DateOfCommenting time.Time   `bson:"DateOfCommenting"`
	Images           ArrayString `bson:"Images"`
}

func (rating *Rating) validate() error {
	if rating.TourID == 0 || rating.PersonID == 0 {
		return errors.New("turID must be valid")
	}
	if rating.Comment == "" {
		return errors.New("comment cannot be empty")
	}

	return nil
}
