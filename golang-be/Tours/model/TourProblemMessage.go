package model

import "time"

type TourProblemMessage struct {
	ProblemMessageId int
	SenderId         int
	RecipientId      int
	CreationTime     time.Time
	Description      string
	IsRead           bool
}
