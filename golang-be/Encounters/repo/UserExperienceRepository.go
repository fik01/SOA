package repo

import (
	"fmt"

	"encounters.xws.com/model"
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

func (repo *UserExperienceRepository) Create(userExperience *model.UserExperience) error {
	dbResult := repo.DatabaseConnection.Create(userExperience)
	if dbResult.Error != nil {
		return dbResult.Error
	}
	fmt.Println("Rows affected: ",dbResult.RowsAffected)
	return nil
}

func (repo *UserExperienceRepository) Get(id string) (model.UserExperience, error) {
	userExperience := model.UserExperience{}
	dbResult := repo.DatabaseConnection.First(&userExperience, "id = ?", id)
	if dbResult.Error != nil {
		return userExperience, dbResult.Error
	}
	return userExperience, nil
}


func (repo *UserExperienceRepository) GetByUserId(id int) (model.UserExperience, error) {
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

	fmt.Println("ROWS AFFECTED: ", dbResult.RowsAffected)
	return nil
}