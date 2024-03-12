package model

import (
	"errors"
	"net/url"
)

type Challenge struct {
	CreatorID          int64
	Description        string
	Name               string
	Status             ChallengeStatus
	Type               ChallengeType
	Latitude           float64
	Longitude          float64
	ExperiencePoints   int
	KeyPointID         *int64
	Image              *url.URL
	LatitudeImage      *float64
	LongitudeImage     *float64
	Range              float64
	RequiredAttendance *int
}

func NewChallenge(creatorID int64, description, name string, status ChallengeStatus, challengeType ChallengeType, latitude, longitude float64,
	imageURL *url.URL, latitudeImage, longitudeImage *float64, rangeVal float64, experiencePoints int, keyPointID, requiredAttendance *int) (*Challenge, error) {
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
