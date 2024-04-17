package model

import (
	"errors"
	"math"
	"time"
)

type ChallengeExecution struct {
	Id             int64      `gorm:"column:Id;primaryKey" json:"Id"`
	TouristId      int64      `gorm:"column:TouristId" json:"TouristId"`
	Challenge      Challenge  `gorm:"-" json:"Challenge"`
	ChallengeId    int64      `gorm:"column:ChallengeId" json:"ChallengeId"`
	Latitude       float64    `gorm:"column:Latitude" json:"Latitude"`
	Longitude      float64    `gorm:"column:Longitude" json:"Longitude"`
	ActivationTime time.Time  `gorm:"column:ActivationTime" json:"ActivationTime"`
	CompletionTime *time.Time `gorm:"column:CompletionTime" json:"CompletionTime,omitempty"`
	IsCompleted    bool       `gorm:"column:IsCompleted" json:"IsCompleted"`
}

func (ChallengeExecution) TableName() string {
	return "encounters.ChallengeExecutions"
}

func NewChallengeExecution(touristId int64, latitude, longitude float64,
	activationTime time.Time, completionTime *time.Time, challengeId int64, isCompleted bool) *ChallengeExecution {
	return &ChallengeExecution{
		TouristId:      touristId,
		Latitude:       latitude,
		Longitude:      longitude,
		ActivationTime: activationTime,
		CompletionTime: completionTime,
		ChallengeId:    challengeId,
		IsCompleted:    isCompleted,
	}
}

func (ce *ChallengeExecution) Complete() {
	currentTime := time.Now().UTC()
	ce.CompletionTime = &currentTime
	ce.IsCompleted = true
}

func (ce *ChallengeExecution) CheckSocialCompletionConditions(numberOfTourists int) error {
	if ce.Challenge.RequiredAttendance != nil && *ce.Challenge.RequiredAttendance > numberOfTourists {
		return errors.New("not enough tourists to complete the challenge")
	}
	distance := calculateDistance(ce.Challenge.Latitude, ce.Challenge.Longitude, ce.Latitude, ce.Longitude)
	if distance > ce.Challenge.Range {
		return errors.New("not close enough to complete the challenge")
	}
	return nil
}

func calculateDistance(challengeLatitude, challengeLongitude, touristLatitude, touristLongitude float64) float64 {
	earthRadius := 6371000

	// Convert latitude and longitude from degrees to radians
	challengeLatitude = toRadians(challengeLatitude)
	challengeLongitude = toRadians(challengeLongitude)
	touristLatitude = toRadians(touristLatitude)
	touristLongitude = toRadians(touristLongitude)

	// Calculate the differences
	dlat := challengeLatitude - touristLatitude
	dlon := challengeLongitude - touristLongitude

	// Haversine formula
	a := math.Pow(math.Sin(dlat/2), 2) + math.Cos(challengeLatitude)*math.Cos(challengeLongitude)*math.Pow(math.Sin(dlon/2), 2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	// Calculate the distance
	distance := float64(earthRadius) * c

	return distance
}

func toRadians(degrees float64) float64 {
	return degrees * math.Pi / 180
}
