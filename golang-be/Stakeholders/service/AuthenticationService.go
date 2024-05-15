package service

import (
	"errors"
	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson"
	"stakeholders/dto"
	"stakeholders/model"
	"stakeholders/repo"
	"strings"
	"time"
)

type Claims struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Role     string `json:"role"`
	*jwt.StandardClaims
}

var jwtKey = []byte("super-secret-key-elmao")

type AuthenticationService struct {
	UserRepo *repo.CRUDRepository[model.User]
}

func (authService *AuthenticationService) Login(request *dto.AuthenticationRequest) (*dto.AuthenticationResponse, error) {

	users, err := authService.UserRepo.Where(bson.M{"username": request.Username})

	if err != nil {
		return nil, err
	}
	user := users[0]

	if user.Password != request.Password {
		return nil, errors.New("incorrect password")
	}

	role := ""
	switch user.Role {
	case 0:
		role = "tourist"
	case 1:
		role = "author"
	case 2:
		role = "administrator"
	}

	claims := &Claims{
		Id:       extractID(user.ID.String()),
		Username: user.Username,
		Role:     role,
		StandardClaims: &jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 10000).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		return nil, err
	}

	response := &dto.AuthenticationResponse{
		AccessToken: tokenString,
	}
	return response, nil
}

func (authService *AuthenticationService) Register(request *dto.RegisterRequest) error {
	err := authService.UserRepo.Create(&request.User)

	if err != nil {
		return err
	}
	return nil
}

func extractID(objectIDString string) string {
	// Trim the "ObjectID(" and ")" parts
	id := strings.TrimPrefix(objectIDString, "ObjectID(\"")
	id = strings.TrimSuffix(id, "\")")
	return id
}
