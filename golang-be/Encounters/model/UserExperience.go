package model

type UserExperience struct {
	Id     int `json:"Id"`
	UserId int `json:"UserId"`
	XP     int `json:"XP"`
	Level  int `json:"Level"`
}

// func (userExperience *UserExperience) BeforeCreate(scope *gorm.DB) error {
// 	userExperience.Id = uuid.New()
// 	return nil
// }

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
