package model

import "github.com/google/uuid"

type UserExperience struct {
	UserId uuid.UUID
	XP int
	Level int
}

func NewUserExperience(userId uuid.UUID, xp int, level int) *UserExperience{
	userExperience := &UserExperience{
		UserId: userId,
		XP: xp,
		Level: 0,
	}

	userExperience.Level = CalculateLevel(userExperience)

	return userExperience
}

func CalculateLevel(userExperience *UserExperience) int{
	level := userExperience.XP / 20 + 1
	return level
}

