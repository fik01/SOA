// model/notification.go
package model

import "time"

type FollowerNotification struct {
	Content       string
	TimeOfArrival time.Time
	Read          bool
}

func NewFollowerNotification(content string, timeOfArrival time.Time, read bool) *FollowerNotification {
	return &FollowerNotification{
		Content:       content,
		TimeOfArrival: timeOfArrival,
		Read:          read,
	}
}
