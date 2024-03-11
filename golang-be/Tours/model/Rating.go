package model

import (
	"errors"
	"gorm.io/gorm"
	"time"
)

type Rating struct {
	gorm.Model
	ID               int `gorm:"primaryKey"`
	TourID           int `gorm:"foreignKey:TourId"`
	PersonID         int
	Mark             int
	Comment          string
	DateOfVisit      time.Time
	DateOfCommenting time.Time
	Images           []string `gorm:"type:text[]"`
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
