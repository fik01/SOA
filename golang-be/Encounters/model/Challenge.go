/*
package model

import (
	"errors"
	"net/url"
)

type Challenge struct {
	IdChallenge        int64           `gorm:"primaryKey" json:"IdChallenge"`
	CreatorID          int64           `json:"creator_id"`
	Description        string          `json:"description"`
	Name               string          `json:"name"`
	Status             ChallengeStatus `json:"status"`
	Type               ChallengeType   `json:"type"`
	Latitude           float64         `json:"latitude"`
	Longitude          float64         `json:"longitude"`
	ExperiencePoints   int             `json:"experience_points"`
	KeyPointID         *int64          `json:"key_point_id,omitempty"`
	Image              *url.URL        `gorm:"-" json:"image,omitempty"`
	LatitudeImage      *float64        `json:"latitude_image,omitempty"`
	LongitudeImage     *float64        `json:"longitude_image,omitempty"`
	Range              float64         `json:"range"`
	RequiredAttendance *int            `json:"required_attendance,omitempty"`
}

func NewChallenge(creatorID int64, description string, name string, status ChallengeStatus, challengeType ChallengeType, latitude float64, longitude float64,
	imageURL *url.URL, latitudeImage *float64, longitudeImage *float64, rangeVal float64, experiencePoints int, keyPointID *int64, requiredAttendance *int) (*Challenge, error) {
	challenge := &Challenge{
		CreatorID:          creatorID,
		Description:        description,
		Name:               name,
		Status:             status,
		Type:               challengeType,
		Latitude:           latitude,
		Longitude:          longitude,
		Image:              imageURL,
		LatitudeImage:      latitudeImage,
		LongitudeImage:     longitudeImage,
		Range:              rangeVal,
		ExperiencePoints:   experiencePoints,
		KeyPointID:         keyPointID,
		RequiredAttendance: requiredAttendance,
	}

	if err := challenge.Validate(); err != nil {
		return nil, err
	}

	return challenge, nil
}

func (c *Challenge) Validate() error {
	if c.Description == "" {
		return errors.New("invalid Description")
	}
	if c.Name == "" {
		return errors.New("invalid Name")
	}
	if c.Latitude > 90 || c.Latitude < -90 {
		return errors.New("invalid latitude")
	}
	if c.Longitude > 180 || c.Longitude < -180 {
		return errors.New("invalid longitude")
	}
	return nil
}

type ChallengeStatus int

const (
	Draft ChallengeStatus = iota
	Active
	Archived
)

type ChallengeType int

const (
	Social ChallengeType = iota
	Location
	Misc
)
*/

package model

import (
	"errors"
	"net/url"
)

type Challenge struct {
	Id                 int64           `gorm:"column:Id;primaryKey" json:"Id"`
	CreatorId          int64           `gorm:"column:CreatorId" json:"CreatorId"`
	Description        string          `gorm:"column:Description" json:"Description"`
	Name               string          `gorm:"column:Name" json:"Name"`
	Status             ChallengeStatus `gorm:"column:Status" json:"Status"`
	Type               ChallengeType   `gorm:"column:Type" json:"Type"`
	Latitude           float64         `gorm:"column:Latitude" json:"Latitude"`
	Longitude          float64         `gorm:"column:Longitude" json:"Longitude"`
	ExperiencePoints   int             `gorm:"column:ExperiencePoints" json:"ExperiencePoints"`
	KeyPointId         *int64          `gorm:"column:KeyPointId" json:"KeyPointId,omitempty"`
	Image              *url.URL        `gorm:"-" json:"Image,omitempty"`
	LatitudeImage      *float64        `gorm:"column:LatitudeImage" json:"LatitudeImage,omitempty"`
	LongitudeImage     *float64        `gorm:"column:LongitudeImage" json:"LongitudeImage,omitempty"`
	Range              float64         `gorm:"column:Range" json:"Range"`
	RequiredAttendance *int            `gorm:"column:RequiredAttendance" json:"RequiredAttendance,omitempty"`
}

func (Challenge) TableName() string {
	return "encounters.Challenges"
}

func (c *Challenge) Validate() error {
	if c.Description == "" {
		return errors.New("invalid Description")
	}
	if c.Name == "" {
		return errors.New("invalid Name")
	}
	if c.Latitude > 90 || c.Latitude < -90 {
		return errors.New("invalid Latitude")
	}
	if c.Longitude > 180 || c.Longitude < -180 {
		return errors.New("invalid Longitude")
	}
	return nil
}

type ChallengeStatus int

const (
	Draft ChallengeStatus = iota
	Active
	Archived
)

type ChallengeType int

const (
	Social ChallengeType = iota
	Location
	Misc
)
