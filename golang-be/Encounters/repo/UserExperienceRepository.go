package repo

import (
	"log"

	"encounters.xws.com/model"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserExperienceRepository struct {
	DatabaseConnection *gorm.DB
}
	
func NewUserExperienceRepository(db *gorm.DB) *UserExperienceRepository {
		return &UserExperienceRepository{
			DatabaseConnection: db,
		}
}

func (repo *UserExperienceRepository) Get(id uuid.UUID) (model.UserExperience, error) {
	var userExperience model.UserExperience
	dbResult := repo.DatabaseConnection.Get(id)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return userExperience, nil
}


func (repo *UserExperienceRepository) GetByUserId(id uuid.UUID) (model.UserExperience, error) {
	var userExperience model.UserExperience
	dbResult := repo.DatabaseConnection.Where("UserId = ?", id).First(&userExperience)
	if dbResult.Error != nil {
		return userExperience, dbResult.Error
	}
	return userExperience, nil
}


func (repo *UserExperienceRepository) Update(userExperience *model.UserExperience) error {
	dbResult := repo.DatabaseConnection.Save(userExperience)
	if dbResult.Error != nil {
		return dbResult.Error
	}

	log.Println(dbResult.RowsAffected)
	return  nil
}