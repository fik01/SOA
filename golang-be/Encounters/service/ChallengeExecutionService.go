package service

import (
	"encounters/model"
	"encounters/repo"
	"errors"
	"fmt"
)

type ChallengeExecutionService struct {
	ChallengeExecutionRepo *repo.ChallengeExecutionRepository
}

func NewChallengeExecutionService(repo *repo.ChallengeExecutionRepository) *ChallengeExecutionService {
	return &ChallengeExecutionService{
		ChallengeExecutionRepo: repo,
	}
}

func (service *ChallengeExecutionService) Complete(challengeId, touristId int64) (*model.ChallengeExecutionDto, error) {
	challengeExecution, err := service.ChallengeExecutionRepo.GetByChallengeIdAndTouristId(challengeId, touristId)
	if err != nil {
		return nil, fmt.Errorf("failed to complete challenge execution: %w", err)
	}

	challengeExecution.Complete()
	if err := service.ChallengeExecutionRepo.SaveChanges(); err != nil {
		return nil, fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
	}

	return challengeExecution.MapToDto(), nil
}

func (service *ChallengeExecutionService) GetPagedByKeyPointIds(keyPointIds []int, page, pageSize int) (*model.PagedResult, error) {
	result, err := service.ChallengeExecutionRepo.GetPagedByKeyPointIds(keyPointIds, page, pageSize)
	if err != nil {
		return nil, fmt.Errorf("failed to get paged challenge executions by key point IDs: %w", err)
	}

	return result.MapToDto(), nil
}

func (service *ChallengeExecutionService) GetPagedByTouristId(touristId int64, page, pageSize int) (*model.PagedResult, error) {
	result, err := service.ChallengeExecutionRepo.GetPagedByTouristId(touristId, page, pageSize)
	if err != nil {
		return nil, fmt.Errorf("failed to get paged challenge executions by tourist ID: %w", err)
	}

	return result.MapToDto(), nil
}

func (service *ChallengeExecutionService) Create(entity *model.ChallengeExecutionDto) (*model.ChallengeExecutionDto, error) {
	newChallengeExecution, err := service.ChallengeExecutionRepo.Create(entity.MapToDomain())
	if err != nil {
		return nil, fmt.Errorf("failed to create challenge execution: %w", err)
	}

	if newChallengeExecution.Challenge.Type == model.ChallengeTypeSocial {
		numTourists, err := service.ChallengeExecutionRepo.GetNumberOfTouristsByChallengeId(newChallengeExecution.ChallengeId)
		if err != nil {
			return nil, fmt.Errorf("failed to get number of tourists for challenge execution: %w", err)
		}

		if numTourists >= newChallengeExecution.Challenge.RequiredAttendance {
			newChallengeExecution.Complete()
			if err := service.ChallengeExecutionRepo.SaveChanges(); err != nil {
				return nil, fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
			}

			incompleteExecutions, err := service.ChallengeExecutionRepo.GetIncompletePagedByChallengeId(newChallengeExecution.ChallengeId, 0, 0)
			if err != nil {
				return nil, fmt.Errorf("failed to get incomplete paged challenge executions by challenge ID: %w", err)
			}

			for _, execution := range incompleteExecutions.Results {
				execution.Complete()
				if err := service.ChallengeExecutionRepo.SaveChanges(); err != nil {
					return nil, fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
				}
			}
		}
	}

	return newChallengeExecution.MapToDto(), nil
}

func (service *ChallengeExecutionService) Update(entity *model.ChallengeExecutionDto) (*model.ChallengeExecutionDto, error) {
	updatedChallengeExecution, err := service.ChallengeExecutionRepo.Update(entity.MapToDomain())
	if err != nil {
		if errors.Is(err, repo.ErrKeyNotFound) {
			return nil, fmt.Errorf("challenge execution not found: %w", err)
		}
		return nil, fmt.Errorf("failed to update challenge execution: %w", err)
	}

	if updatedChallengeExecution.Challenge.Type == model.ChallengeTypeSocial {
		numTourists, err := service.ChallengeExecutionRepo.GetNumberOfTouristsByChallengeId(updatedChallengeExecution.ChallengeId)
		if err != nil {
			return nil, fmt.Errorf("failed to get number of tourists for challenge execution: %w", err)
		}

		if numTourists >= updatedChallengeExecution.Challenge.RequiredAttendance {
			updatedChallengeExecution.Complete()
			if err := service.ChallengeExecutionRepo.SaveChanges(); err != nil {
				return nil, fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
			}

			incompleteExecutions, err := service.ChallengeExecutionRepo.GetIncompletePagedByChallengeId(updatedChallengeExecution.ChallengeId, 0, 0)
			if err != nil {
				return nil, fmt.Errorf("failed to get incomplete paged challenge executions by challenge ID: %w", err)
			}

			for _, execution := range incompleteExecutions.Results {
				execution.Complete()
				if err := service.ChallengeExecutionRepo.SaveChanges(); err != nil {
					return nil, fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
				}
			}
		}
	}

	return updatedChallengeExecution.MapToDto(), nil
}

func (service *ChallengeExecutionService) GetUserIds(challengeId int64) ([]int64, error) {
	userIds, err := service.ChallengeExecutionRepo.GetUserIds(challengeId)
	if err != nil {
		return nil, fmt.Errorf("failed to get user IDs for challenge execution: %w", err)
	}
	return userIds, nil
}
