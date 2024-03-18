package repo

import (
	"gorm.io/gorm"
)

type CRUDRepository[T any] struct {
	DatabaseConnection *gorm.DB
}

func (repo *CRUDRepository[T]) Create(entity *T) error {
	dbResult := repo.DatabaseConnection.Create(entity)
	if dbResult.Error != nil {
		return dbResult.Error
	}
	return nil
}

func (repo *CRUDRepository[T]) GetById(id int) (*T, error) {
	var entity T
	dbResult := repo.DatabaseConnection.Model(&entity).Where("id = ?", id).First(&entity)
	if dbResult != nil {
		return &entity, dbResult.Error
	}
	return &entity, nil
}

func (repo *CRUDRepository[T]) GetAll() (*[]T, error) {
	var entities []T
	err := repo.DatabaseConnection.Find(&entities).Error
	if err != nil {
		return nil, err
	}
	return &entities, nil
}

func (repo *CRUDRepository[T]) Update(entity *T) error {
	return repo.DatabaseConnection.Save(&entity).Error
}

func (repo *CRUDRepository[T]) Delete(entity *T) error {
	return repo.DatabaseConnection.Delete(entity).Error
}

func (repo *CRUDRepository[T]) DeleteById(id int) error {
	entity, err := repo.GetById(id)

	if err != nil {
		return err
	}

	err = repo.Delete(entity)

	if err != nil {
		return err
	}

	return nil
}

func (repo *CRUDRepository[T]) Where(query interface{}, args ...interface{}) (*[]T, error) {
	var entities []T
	err := repo.DatabaseConnection.Model(&entities).Where(query, args...).Find(&entities).Error
	if err != nil {
		return nil, err
	}
	return &entities, nil
}
