package model

import "go.mongodb.org/mongo-driver/bson/primitive"

const (
	Tourist = iota
	Author
	Admin
)

type User struct {
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	Username     string
	Password     string
	Role         int
	IsActive     bool
	PersonalInfo Person
}
