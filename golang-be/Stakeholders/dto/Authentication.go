package dto

import "stakeholders/model"

type AuthenticationRequest struct {
	Username string
	Password string
}

type AuthenticationResponse struct {
	AccessToken string
}

type RegisterRequest struct {
	User model.User
}
