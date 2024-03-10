package service

import (
	"encounters.xws.com/model"
	"encounters.xws.com/repo"
	"github.com/google/uuid"
)

type UserExperienceService struct {
	UserExperienceRepo *repo.UserExperienceRepository
}

func NewUserExperienceService(repo *repo.UserExperienceRepository) *UserExperienceService {
    return &UserExperienceService{
        UserExperienceRepo: repo,
    }
}

func (service *UserExperienceService) AddXP(id uuid.UUID, xp int) (model.UserExperience, error) {
	userExperience, err := service.UserExperienceRepo.Get(id)
	if err != nil{
		return userExperience, err
	}
	userExperience.XP += xp
	userExperience.Level = model.CalculateLevel(&userExperience)
	dbResult := service.UserExperienceRepo.Update(&userExperience)
	if dbResult.Error != nil {
		return userExperience, dbResult
	}
	return userExperience, nil
}

func (service *UserExperienceService) GetByUserId(id uuid.UUID) (model.UserExperience, error) {
	userExperience, err := service.UserExperienceRepo.GetByUserId(id)
	if err != nil {
		return userExperience, err
	}
	return userExperience, nil
}