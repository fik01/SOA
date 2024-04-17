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
