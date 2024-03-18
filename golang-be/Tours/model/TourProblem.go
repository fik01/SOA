package model

import "time"

type TourProblem struct {
	Id          int `gorm:"primaryKey"`
	TouristId   int
	TourId      int
	Description string
	Time        time.Time
	IsSolved    bool
	//Deadline        *time.Time
	Category        TourProblemCategory
	Priority        TourProblemPriority
	TouristUsername string
	AuthorUsername  string
	Messages        []TourProblemMessage `gorm:"foreignKey:ProblemMessageId"`
}

type TourProblemCategory int

const (
	BOOKING TourProblemCategory = iota
	ITINERARY
	PAYMENT
	TRANSPORTATION
	GUIDE_SERVICES
	OTHER
)

type TourProblemPriority int

const (
	LOW TourProblemPriority = iota
	MEDIUM
	HIGH
)
