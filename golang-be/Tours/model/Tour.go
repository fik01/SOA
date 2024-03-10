package model

import (
	"database/sql/driver"
	"errors"
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
)

type ArrayString []string

// Value converts ArrayString to a PostgreSQL-compatible representation
func (a ArrayString) Value() (driver.Value, error) {
	if len(a) == 0 {
		return "{}", nil
	}

	// Convert array elements to a string slice
	strSlice := make([]string, len(a))
	for i, v := range a {
		strSlice[i] = fmt.Sprintf("%s", v)
	}

	// Join elements with commas and enclose in curly braces
	result := fmt.Sprintf("{%s}", strings.Join(strSlice, ","))

	return result, nil
}

// Scan converts a PostgreSQL array string representation to ArrayString
func (a *ArrayString) Scan(value interface{}) error {
	if value == nil {
		*a = nil
		return nil
	}

	// Convert value to string
	str, ok := value.(string)
	if !ok {
		return fmt.Errorf("unsupported type for ArrayString: %T", value)
	}

	// Remove curly braces from the string
	str = strings.TrimPrefix(str, "{")
	str = strings.TrimSuffix(str, "}")

	// Split string into individual tags
	tags := strings.Split(str, ",")

	// Trim whitespaces from each tag
	for i, tag := range tags {
		tags[i] = strings.TrimSpace(tag)
	}

	*a = ArrayString(tags)
	return nil
}

type Tour struct {
	gorm.Model
	ID            int `gorm:"primaryKey"`
	Name          string
	Description   string
	Price         float64
	Difficulty    TourDifficulty
	Tags          ArrayString `json:"tags" gorm:"type:text[]"`
	Equipment     []int       `gorm:"type:integer[]"`
	Status        TourStatus
	AuthorID      int
	DistanceInKm  float64
	ArchivedDate  time.Time
	PublishedDate time.Time
	Image         string
	KeyPoints     []TourKeyPoint `gorm:"foreignKey:TourID"`
	Durations     []TourDuration `gorm: "foreignKey:TourID"`
}

func NewTour(name string, description string, price float64, difficulty TourDifficulty,
	tags ArrayString, status TourStatus, authorId int, equipment []int, distanceInKm float64,
	archiveDate, publishDate time.Time, image string, keyPoints []TourKeyPoint, durations []TourDuration) *Tour {
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
}

func (tour *Tour) CreateID(scope *gorm.DB) error {
	tour.ID = 0
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
	if len(tour.Tags) == 0 {
		return errors.New("not enough Tags")
	}
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
