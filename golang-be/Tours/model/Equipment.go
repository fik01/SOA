package model

import (
	"errors"
	"gorm.io/gorm"
)

type Equipment struct {
	gorm.Model
	ID          int `gorm:"primaryKey"`
	Name        string
	Description string
}

func (equipment *Equipment) validate() error {
	if equipment.Name == "" {
		return errors.New("cannot be empty string")
	}
	return nil
}
