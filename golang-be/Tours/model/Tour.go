package model

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Tag struct {
	TagID   uuid.UUID
	TagName string
}

type Tour struct {
	gorm.Model
	ID            uuid.UUID `gorm:"primaryKey"`
	Name          string
	Description   string
	Price         float64
	Difficulty    TourDifficulty
	Tags          []string `json:"tags" gorm:"type:text[]"`
	Equipment     []int    `gorm:"type:integer[]"`
	Status        TourStatus
	AuthorID      int
	DistanceInKm  float64
	ArchivedDate  time.Time
	PublishedDate time.Time
	Image         string
	KeyPoints     []TourKeyPoint `gorm:"foreignKey:TourID"`
	Durations     string
}

/*func NewTour(name string, description string, price float64, difficulty TourDifficulty,
	tags []Tag, status TourStatus, authorId int, equipment []int, distanceInKm float64,
	archiveDate, publishDate time.Time, image string, keyPoints []TourKeyPoint, durations string) *Tour {
	tour := &Tour{
		Name:          name,
		Description:   description,
		Price:         price,
		Difficulty:    difficulty,
		Tags:          tags,
		Status:        status,
		AuthorID:      authorId,
		DistanceInKm:  distanceInKm,
		ArchivedDate:  archiveDate,
		PublishedDate: publishDate,
		Image:         image,
		KeyPoints:     keyPoints,
		Durations:     durations,
	}

	return tour
}*/

func (tour *Tour) CreateID(scope *gorm.DB) error {
	tour.ID = uuid.New()
	return nil
}

func (tour *Tour) validate() error {
	if tour.Name == "" {
		return errors.New("invalid name")
	}
	if tour.Description == "" {
		return errors.New("invalid Description")
	}
	if tour.Price < 0 {
		return errors.New("invalid Price")
	}
	/*if len(tour.Tags) == 0 {
		return errors.New("not enough Tags")
	}*/
	if len(tour.KeyPoints) < 2 {
		return errors.New("not enough Key Points")
	}

	if tour.Status == Published {
		return errors.New("tour is already published")
	}

	return nil
}

type TourStatus int

const (
	Draft TourStatus = iota
	Published
	Archived
	TouristMade
)

type TourDifficulty int

const (
	Beginner TourDifficulty = iota
	Intermediate
	Advanced
	Pro
)
