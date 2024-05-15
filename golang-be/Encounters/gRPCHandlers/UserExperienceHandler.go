package gRPCHandlers

import (
	"context"
	"errors"

	"encounters/model"

	user_experience "encounters/proto/encounters"
)

func (handler *EncounterHandler) Create(ctx context.Context, req *user_experience.UserExperience) (*user_experience.StatusCodeResponse, error) {
	userExp := protoToModel(req)
	if userExp == nil {
		return nil, errors.New("Error while parsing user experience!")
	}

	err := handler.UserExperienceService.Create(userExp)
	if err != nil {
		return nil, err
	}

	return &user_experience.StatusCodeResponse{StatusCode: 200}, nil
}

func (handler *EncounterHandler) AddXP(ctx context.Context, req *user_experience.AddXPRequest) (*user_experience.UserExperience, error) {
	userExperience, err := handler.UserExperienceService.AddXP(int(req.GetId()), int(req.GetXp()))
	if err != nil {
		return nil, err
	}

	return modelToProto(&userExperience), nil
}

func (handler *EncounterHandler) GetXPByUserId(ctx context.Context, req *user_experience.GetXPByUserIdRequest) (*user_experience.UserExperience, error) {
	userExperience, err := handler.UserExperienceService.GetByUserId(int(req.GetUserId()))
	if err != nil {
		return nil, err
	}

	return modelToProto(&userExperience), nil
}

func (handler *EncounterHandler) Delete(ctx context.Context, req *user_experience.DeleteRequest) (*user_experience.StatusCodeResponse, error) {
	err := handler.UserExperienceService.Delete(int(req.GetId()))
	if err != nil {
		return nil, err
	}

	return &user_experience.StatusCodeResponse{StatusCode: 200}, nil
}

func modelToProto(model *model.UserExperience) *user_experience.UserExperience {
	if model == nil {
		return nil
	}
	return &user_experience.UserExperience{
		Id:               int32(model.Id),
		UserId:           int32(model.UserId),
		ExperiencePoints: int32(model.XP),
		Level:            int32(model.Level),
	}
}

func protoToModel(req *user_experience.UserExperience) *model.UserExperience {
	if req == nil {
		return nil
	}
	return &model.UserExperience{
		Id:     int(req.GetId()),
		UserId: int(req.GetUserId()),
		XP:     int(req.GetExperiencePoints()),
		Level:  int(req.GetLevel()),
	}
}