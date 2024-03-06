package repo

import (
    //"database-example/model"
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

func (repo *ChallengeExecutionRepository) GetByChallengeIdAndTouristId(challengeId, touristId int64) (model.ChallengeExecution, error) {
    var challengeExecution model.ChallengeExecution
    dbResult := repo.DatabaseConnection.Where("challenge_id = ? AND tourist_id = ?", challengeId, touristId).First(&challengeExecution)
    if dbResult.Error != nil {
        return challengeExecution, dbResult.Error
    }
    return challengeExecution, nil
}

func (repo *ChallengeExecutionRepository) GetPagedByKeyPointIds(tourKeyPointIds []int, page, pageSize int) ([]model.ChallengeExecution, error) {
    var challengeExecutions []model.ChallengeExecution
    dbResult := repo.DatabaseConnection.Where("key_point_id IN ?", tourKeyPointIds).Offset((page - 1) * pageSize).Limit(pageSize).Find(&challengeExecutions)
    if dbResult.Error != nil {
        return nil, dbResult.Error
    }
    return challengeExecutions, nil
}

