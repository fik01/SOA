package model

import (
	"database/sql/driver"
	"errors"
	"fmt"
	"strings"
	"time"
	//"gorm.io/gorm"
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
	Id            int            `bson:"_id,omitempty"` // If you want to use a custom ID, use "_id" field name
	Name          string         `bson:"name"`
	Description   string         `bson:"description"`
	Price         float64        `bson:"price"`
	Difficulty    TourDifficulty `bson:"difficulty"`
	Tags          []string       `bson:"tags"`
	Equipment     []int32        `bson:"equipment"`
	Status        TourStatus     `bson:"status"`
	AuthorID      int            `bson:"author_id"`
	DistanceInKm  float64        `bson:"distance_in_km"`
	ArchivedDate  time.Time      `bson:"archived_date"`
	PublishedDate time.Time      `bson:"published_date"`
	Image         string         `bson:"image"`
	KeyPoints     []TourKeyPoint `bson:"key_points"`
	Durations     []TourDuration `bson:"durations"`
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

func (tour *Tour) Publish(authorId int) error {
	if tour.AuthorID != authorId {
		return errors.New("author id doesn't match tour")
	}
	tour.Status = Published
	return nil
}

func (tour *Tour) Archive(authorId int) error {
	if tour.AuthorID != authorId {
		return errors.New("author id doesn't match tour")
	}
	tour.Status = Archived
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
