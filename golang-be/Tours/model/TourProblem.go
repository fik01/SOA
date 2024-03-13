package model

import "time"

type TourProblem struct {
	Id          int `gorm: "primary key"`
	TouristId   int
	TourId      int
	Description string
	Time        time.Time
	IsSolved    bool
	Deadline    time.Time
	Category    TourProblemCategory
	Priority    TourProblemPriority
	Messages    []TourProblemMessage `gorm:"foreignKey:ProblemMessageId"`
}

type TourProblemCategory int

const (
	BOOKING TourDifficulty = iota
	ITINERARY
	PAYMENT
	TRANSPORTATION
	GUIDE_SERVICES
	OTHER
)

type TourProblemPriority int

const (
	LOW TourDifficulty = iota
	MEDIUM
	HIGH
)
