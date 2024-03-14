package service

import (
	"encounters.xws.com/model"
	"encounters.xws.com/repo"
)

type UserExperienceService struct {
	UserExperienceRepo *repo.UserExperienceRepository
}

func NewUserExperienceService(repo *repo.UserExperienceRepository) *UserExperienceService {
    return &UserExperienceService{
        UserExperienceRepo: repo,
    }
}

func (service *UserExperienceService) Create(userExperience *model.UserExperience) error {
	err := service.UserExperienceRepo.Create(userExperience)
	if err != nil {
		return err
	}
	return nil
}

func (service *UserExperienceService) Delete(id int) error {
	userExperience, err := service.UserExperienceRepo.Get(id)
	if err != nil{
		return err
	}
	err1 := service.UserExperienceRepo.Delete(&userExperience)
	if err1 != nil {
		return err1
	}
	return nil
}

func (service *UserExperienceService) AddXP(id int, xp int) (model.UserExperience, error) {
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

func (service *UserExperienceService) GetByUserId(id int) (model.UserExperience, error) {
	userExperience, err := service.UserExperienceRepo.GetByUserId(id)
	if err != nil {
		return userExperience, 
		err
	}
	return userExperience, nil
}