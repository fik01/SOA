package model

type User struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
	// Add other user properties as needed
}

type Users []*User
