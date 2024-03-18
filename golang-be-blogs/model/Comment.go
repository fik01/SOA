package model

import "time"

type Comment struct {
	Id           int    `gorm:"primaryKey" json:"Id"`
	Description  string `json:"Description"`
	UserId       int    `json:"UserId"`
	BlogId       int    `json:"BlogId"`
	CreationDate time.Time `json:"CreationDate"`
	LastEditDate time.Time `json:"LastEditDate"`
}
