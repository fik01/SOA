package model

type UserExperience struct {
	Id     int `json:"Id" gorm:"column:Id;primaryKey;autoIncrement"`
	UserId int `json:"UserId" gorm:"column:UserId"`
	XP     int `json:"XP" gorm:"column:XP"`
	Level  int `json:"Level" gorm:"column:Level"`
}

func (UserExperience) TableName() string {
	return "UserExperience"
}

func NewUserExperience(userId int, xp int, level int) *UserExperience {
	userExperience := &UserExperience{
		UserId: userId,
		XP:     xp,
		Level:  0,
	}

	userExperience.Level = CalculateLevel(userExperience)

	return userExperience
}

func CalculateLevel(userExperience *UserExperience) int {
	level := userExperience.XP/20 + 1
	return level
}
