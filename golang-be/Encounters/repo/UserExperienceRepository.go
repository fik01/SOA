package repo

import (
	"fmt"

	"encounters/model"
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
	fmt.Println("KREIRANJE")
	dbResult := repo.DatabaseConnection.Create(userExperience)
	if dbResult.Error != nil {
		return dbResult.Error
	}
	fmt.Println("KREIRAO")
	return nil
}

func (repo *UserExperienceRepository) Delete(userExperience *model.UserExperience) error {
	fmt.Println("\nBRISANJE")
	dbResult := repo.DatabaseConnection.Where(`"UserExperience"."Id" = ?`, userExperience.Id).Delete(&model.UserExperience{})
    if dbResult.Error != nil {
        return dbResult.Error
    }
	fmt.Println("Succesfully deleted: ")
	return nil
}

func (repo *UserExperienceRepository) Get(id int) (model.UserExperience, error) {
	userExperience := model.UserExperience{}
	dbResult := repo.DatabaseConnection.First(&userExperience, id)
	if dbResult.Error != nil {
		return userExperience, dbResult.Error
	}
	return userExperience, nil
}


func (repo *UserExperienceRepository) GetByUserId(id int) (model.UserExperience, error) {
	fmt.Println("DOBAVLJANJE")
	var userExperience model.UserExperience
	dbResult := repo.DatabaseConnection.Where(`"UserExperience"."UserId" = ?`, id).First(&userExperience)
	if dbResult.Error != nil {
		return userExperience, dbResult.Error
	}
	fmt.Println("DOBAVIO")
	return userExperience, nil
}


func (repo *UserExperienceRepository) Update(userExperience *model.UserExperience) error {
	dbResult := repo.DatabaseConnection.Model(&model.UserExperience{}).Where(`"UserExperience"."Id" = ?`, userExperience.Id).Updates(&userExperience)
	if dbResult.Error != nil {
		return dbResult.Error
	}

	fmt.Println("ROWS AFFECTED: ", dbResult.RowsAffected)
	return nil
}