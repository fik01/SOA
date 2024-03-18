package model

type BlogPage struct {
	Id    int `gorm:"primaryKey" json:"Id"`
	Title  string    `json:"Title"`
	Description string    `json:"Description"`
	Status int    `json:"Status"`
	UserId int    `json:"UserId"`
	RatingSum int    `json:"RatingSum"`
}

