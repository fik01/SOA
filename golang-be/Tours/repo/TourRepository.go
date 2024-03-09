package repo

import (
	"fmt"
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

func (repo *TourRepository) GetAll() ([]model.Tour, error) {
	var tours []model.Tour
	dbResult := repo.DatabaseConnection.Preload("KeyPoints").Preload("Durations").Find(&tours)
	fmt.Println(dbResult)
	if dbResult.Error != nil {
		return nil, dbResult.Error
	}

	return tours, nil
}
