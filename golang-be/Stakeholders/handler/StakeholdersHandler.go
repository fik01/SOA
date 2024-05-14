package handler

import (
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"stakeholders/dto"
	"stakeholders/model"
	stakeholders_service "stakeholders/proto/stakeholders-service"
	"stakeholders/service"
)

type StakeholdersHandler struct {
	stakeholders_service.UnimplementedStakeholdersServiceServer
	AuthService *service.AuthenticationService
}

func (server *StakeholdersHandler) Login(ctx context.Context, req *stakeholders_service.LoginRequest) (*stakeholders_service.LoginResponse, error) {
	response, err := server.AuthService.Login(protoToDtoAuthReq(req))
	if err != nil {
		return nil, err
	}
	return dtoToProtoAuthResp(response), nil
}

func (server *StakeholdersHandler) Register(ctx context.Context, req *stakeholders_service.RegisterRequest) (*stakeholders_service.RegisterResponse, error) {
	err := server.AuthService.Register(protoToDtoRegisterReq(req))
	if err != nil {
		return nil, err
	}
	return &stakeholders_service.RegisterResponse{StatusCode: "200"}, nil
}

func protoToDtoAuthReq(req *stakeholders_service.LoginRequest) *dto.AuthenticationRequest {
	if req != nil {
		return &dto.AuthenticationRequest{
			Username: req.GetUsername(),
			Password: req.GetPassword(),
		}
	}
	return nil
}

func dtoToProtoAuthResp(dto *dto.AuthenticationResponse) *stakeholders_service.LoginResponse {
	if dto != nil {
		return &stakeholders_service.LoginResponse{AccessToken: dto.AccessToken}
	}
	return nil
}

func protoToDtoRegisterReq(req *stakeholders_service.RegisterRequest) *dto.RegisterRequest {
	if req != nil {

		role := 0
		switch req.GetUser().GetRole() {
		case "Tourist":
			role = 0
		case "Author":
			role = 1
		case "Admin":
			role = 2
		}

		return &dto.RegisterRequest{User: model.User{
			ID:       primitive.ObjectID{},
			Username: req.GetUser().GetUsername(),
			Password: req.GetUser().GetPassword(),
			Role:     role,
			IsActive: req.GetUser().GetIsActive(),
			PersonalInfo: model.Person{
				Name:       req.GetUser().GetPersonalInfo().GetName(),
				Surname:    req.GetUser().GetPersonalInfo().GetSurname(),
				Email:      req.GetUser().GetPersonalInfo().GetEmail(),
				ProfilePic: req.GetUser().GetPersonalInfo().GetProfilePic(),
				Biography:  req.GetUser().GetPersonalInfo().GetBiography(),
				Motto:      req.GetUser().GetPersonalInfo().GetMotto(),
			},
		}}
	}
	return nil
}
