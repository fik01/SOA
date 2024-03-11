package repo

import (
	"log"
	"tours/model"

	"gorm.io/gorm"
)

type TourRepository struct {
	DatabaseConnection *gorm.DB
}

func (repo *TourRepository) CreateNewTour(tour *model.Tour) error {
	dbResult := repo.DatabaseConnection.Create(tour)
	if dbResult.Error != nil {
		return dbResult.Error
	}
	log.Println(dbResult.RowsAffected)
	return nil
}

func (repo *TourRepository) UpdateTour(tour *model.Tour) error {
	dbResult := repo.DatabaseConnection.Save(tour)
	if dbResult.Error != nil {
		return dbResult.Error
	}

	log.Println(dbResult.RowsAffected)
	return nil
}
func (repo *TourRepository) Get(id int) (model.Tour, error) {
	var tours model.Tour
	dbResult := repo.DatabaseConnection.Where("id = ?", id).Preload("KeyPoints").Preload("Durations").Find(&tours)
	if dbResult.Error != nil {
		return tours, dbResult.Error
	}
	return tours, nil
}

func (repo *TourRepository) GetAll() ([]model.Tour, error) {
	var tours []model.Tour
	dbResult := repo.DatabaseConnection.Preload("KeyPoints").Preload("Durations").Find(&tours)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}

	return tours, nil
}

func (repo *TourRepository) GetAllByAuthorId(authorId int) ([]model.Tour, error) {
	var tours []model.Tour
	dbResult := repo.DatabaseConnection.Where("author_id = ?", authorId).Preload("KeyPoints").Preload("Durations").Find(&tours)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}
	return tours, nil
}
