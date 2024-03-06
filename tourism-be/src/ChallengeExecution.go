package model

import (
    "time"
    "math"
)

type ChallengeExecution struct {
    TouristId      int64
    Challenge      Challenge
    ChallengeId    int64
    Latitude       float64
    Longitude      float64
    ActivationTime time.Time
    CompletionTime *time.Time
    IsCompleted    bool
}

func NewChallengeExecution(touristId int64, latitude, longitude float64,
    activationTime time.Time, completionTime *time.Time, challengeId int64, isCompleted bool) ChallengeExecution {
    return ChallengeExecution{
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
    completionTime := time.Now()
    ce.CompletionTime = &completionTime
    ce.IsCompleted = true
}

func (ce *ChallengeExecution) CheckSocialCompletionConditions(numberOfTourists int) error {
    if ce.Challenge.RequiredAttendance > numberOfTourists {
        return errors.New("Not enough tourists to complete the challenge")
    }
    if ce.Challenge.Range > ce.calculateDistance(ce.Challenge.Latitude, ce.Challenge.Longitude, ce.Latitude, ce.Longitude) {
        return errors.New("Not close enough to complete the challenge")
    }
    return nil
}

func (ce *ChallengeExecution) calculateDistance(challengeLatitude, challengeLongitude, touristLatitude, touristLongitude float64) float64 {
    earthRadius := 6371000.0

    // Convert latitude and longitude from degrees to radians
    challengeLatitude = toRadians(challengeLatitude)
    challengeLongitude = toRadians(challengeLongitude)
    touristLatitude = toRadians(touristLatitude)
    touristLongitude = toRadians(touristLongitude)

    // Calculate the differences
    dlat := challengeLatitude - touristLatitude
    dlon := challengeLongitude - touristLongitude

    // Haversine formula
    a := math.Pow(math.Sin(dlat/2), 2) + math.Cos(challengeLatitude) * math.Cos(challengeLongitude) * math.Pow(math.Sin(dlon/2), 2)
    c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1 - a))

    // Calculate the distance
    distance := earthRadius * c

    return distance
}

func toRadians(degrees float64) float64 {
    return degrees * math.Pi / 180
}