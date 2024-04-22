/*package model

import (
	"errors"
)

type Follower struct {
	FollowerID   int64 `gorm:"primaryKey"`
	FollowedID   int64
	Notification FollowerNotification `gorm:"embedded"` // Koristi embedded oznaku za ugnježdavanje strukture
}

func NewFollower(followerID, followedID int64, notification FollowerNotification) (*Follower, error) {
	if followerID == 0 {
		return nil, errors.New("invalid FollowerID")
	}
	if followedID == 0 {
		return nil, errors.New("invalid FollowedID")
	}

	return &Follower{
		FollowerID:   followerID,
		FollowedID:   followedID,
		Notification: notification,
	}, nil
}

//func (Follower) TableName() string {
//	return "Followers"
//}
*/

package model

import (
	"errors"
)

type Follower struct {
	FollowerID   int64                `json:"followerId" gorm:"primaryKey"`
	FollowedID   int64                `json:"followedId"`
	Notification FollowerNotification `json:"notification" gorm:"embedded"`
}

func NewFollower(followerID, followedID int64, notification FollowerNotification) (*Follower, error) {
	if followerID == 0 {
		return nil, errors.New("invalid FollowerID")
	}
	if followedID == 0 {
		return nil, errors.New("invalid FollowedID")
	}

	return &Follower{
		FollowerID:   followerID,
		FollowedID:   followedID,
		Notification: notification,
	}, nil
}
