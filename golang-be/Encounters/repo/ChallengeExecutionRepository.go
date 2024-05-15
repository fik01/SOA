package repo

import (
	"errors"
	"fmt"
	"log"

	"encounters/model"
	"gorm.io/gorm"
)

type ChallengeExecutionRepository struct {
	DatabaseConnection *gorm.DB
}

func NewChallengeExecutionRepository(db *gorm.DB) *ChallengeExecutionRepository {
	return &ChallengeExecutionRepository{
		DatabaseConnection: db,
	}
}

func (repo *ChallengeExecutionRepository) Create(entity *model.ChallengeExecution) error {
	result := repo.DatabaseConnection.Create(entity)
	if result.Error != nil {
		return result.Error
	}
	log.Println(result.RowsAffected)
	return nil
}

func (repo *ChallengeExecutionRepository) Delete(id int64) error {
	result := repo.DatabaseConnection.Delete(&model.ChallengeExecution{}, id)
	if result.Error != nil {
		return result.Error
	}
	if result.RowsAffected == 0 {
		return errors.New("no rows affected, entity not found")
	}

	return nil
}

func (repo *ChallengeExecutionRepository) Get(id int64) (*model.ChallengeExecution, error) {
	var challengeExecution model.ChallengeExecution
	result := repo.DatabaseConnection.Where("id = ?", id).Preload("Challenge").First(&challengeExecution)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New("Not found: " + fmt.Sprint(id))
	}
	return &challengeExecution, nil
}

func (repo *ChallengeExecutionRepository) Update(entity *model.ChallengeExecution) error {
	result := repo.DatabaseConnection.Save(entity)
	if result.Error != nil {
		return result.Error
	}
	log.Println(result.RowsAffected)
	return nil
}

func (repo *ChallengeExecutionRepository) GetByChallengeIdAndTouristId(challengeId, touristId int64) (*model.ChallengeExecution, error) {
	var challengeExecution model.ChallengeExecution
	result := repo.DatabaseConnection.Where("ChallengeId = ? AND TouristId = ?", challengeId, touristId).Preload("Challenge").First(&challengeExecution)
	if result.Error != nil {
		return nil, result.Error
	}
	if result.RowsAffected == 0 {
		return nil, errors.New(fmt.Sprintf("Not found: ChallengeId=%d, TouristId=%d", challengeId, touristId))
	}
	return &challengeExecution, nil
}

func (repo *ChallengeExecutionRepository) GetNumberOfTouristsByChallengeId(challengeId int64) int {
	var count int64
	repo.DatabaseConnection.Model(&model.ChallengeExecution{}).
		Where("ChallengeId = ? AND NOT IsCompleted", challengeId).
		Count(&count)
	return int(count)
}

func (repo *ChallengeExecutionRepository) SaveChanges() error {
	err := repo.DatabaseConnection.Save(&model.ChallengeExecution{}).Error
	if err != nil {
		return fmt.Errorf("failed to save changes: %w", err)
	}
	return nil
}

func (repo *ChallengeExecutionRepository) GetIncompletePagedByChallengeId(challengeId int64, page, pageSize int) ([]model.ChallengeExecution, error) {
	var challengeExecutions []model.ChallengeExecution
	err := repo.DatabaseConnection.
		Preload("Challenge").
		Where("ChallengeId = ? AND NOT IsCompleted", challengeId).
		Offset((page - 1) * pageSize).
		Limit(pageSize).
		Find(&challengeExecutions).Error
	if err != nil {
		return nil, fmt.Errorf("failed to get paged incomplete challenge executions by challenge ID: %w", err)
	}
	return challengeExecutions, nil
}

func (repo *ChallengeExecutionRepository) GetAll() ([]model.ChallengeExecution, error) {
	var entities []model.ChallengeExecution
	if err := repo.DatabaseConnection.Find(&entities).Error; err != nil {
		return nil, err
	}
	return entities, nil
}
