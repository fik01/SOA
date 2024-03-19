package service

import (
	"fmt"

	"encounters.xws.com/model"
	"encounters.xws.com/repo"
)

type ChallengeExecutionService struct {
	ChallengeExecutionRepository *repo.ChallengeExecutionRepository
}

func NewChallengeExecutionService(repo *repo.ChallengeExecutionRepository) *ChallengeExecutionService {
	return &ChallengeExecutionService{
		ChallengeExecutionRepository: repo,
	}
}

func (service *ChallengeExecutionService) Complete(challengeId, touristId int64) (*model.ChallengeExecution, error) {
	challengeExecution, err := service.ChallengeExecutionRepository.GetByChallengeIdAndTouristId(challengeId, touristId)
	if err != nil {
		return nil, fmt.Errorf("failed to complete challenge execution: %w", err)
	}

	challengeExecution.Complete()
	if err := service.ChallengeExecutionRepository.SaveChanges(); err != nil {
		return nil, fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
	}

	return challengeExecution, nil
}

func (service *ChallengeExecutionService) Create(entity *model.ChallengeExecution) error {
	if err := service.ChallengeExecutionRepository.Create(entity); err != nil {
		return fmt.Errorf("failed to create challenge execution: %w", err)
	}

	if entity.Challenge != (model.Challenge{}) && entity.Challenge.Type == model.Social {
		numTourists := service.ChallengeExecutionRepository.GetNumberOfTouristsByChallengeId(entity.ChallengeId)

		if entity.Challenge.RequiredAttendance != nil && numTourists >= *entity.Challenge.RequiredAttendance {
			entity.Complete()
			if err := service.ChallengeExecutionRepository.SaveChanges(); err != nil {
				return fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
			}

			incompleteExecutions, err := service.ChallengeExecutionRepository.GetIncompletePagedByChallengeId(entity.ChallengeId, 0, 0)
			if err != nil {
				return fmt.Errorf("failed to get incomplete paged challenge executions by challenge ID: %w", err)
			}

			for _, execution := range incompleteExecutions {
				execution.Complete()
				if err := service.ChallengeExecutionRepository.SaveChanges(); err != nil {
					return fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
				}
			}
		}
	}

	return nil
}

func (service *ChallengeExecutionService) Update(challengeExecution *model.ChallengeExecution) error {
	if err := service.ChallengeExecutionRepository.Update(challengeExecution); err != nil {
		return fmt.Errorf("failed to update challenge execution: %w", err)
	}

	if challengeExecution.Challenge.Type == model.Social {
		numTourists := service.ChallengeExecutionRepository.GetNumberOfTouristsByChallengeId(challengeExecution.ChallengeId)

		if numTourists < 0 {
			return fmt.Errorf("failed to get number of tourists for challenge execution")
		}

		if numTourists >= *challengeExecution.Challenge.RequiredAttendance {
			challengeExecution.Complete()
			if err := service.ChallengeExecutionRepository.SaveChanges(); err != nil {
				return fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
			}

			incompleteExecutions, err := service.ChallengeExecutionRepository.GetIncompletePagedByChallengeId(challengeExecution.ChallengeId, 0, 0)
			if err != nil {
				return fmt.Errorf("failed to get incomplete paged challenge executions by challenge ID: %w", err)
			}

			for _, execution := range incompleteExecutions {
				execution.Complete()
				if err := service.ChallengeExecutionRepository.SaveChanges(); err != nil {
					return fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
				}
			}
		}
	}

	return nil
}

func (service *ChallengeExecutionService) Delete(id int64) error {
	err := service.ChallengeExecutionRepository.Delete(id)
	if err != nil {
		return err
	}
	return nil
}

func (service *ChallengeExecutionService) GetAll() ([]model.ChallengeExecution, error) {
	entities, err := service.ChallengeExecutionRepository.GetAll()
	if err != nil {
		return nil, err
	}
	return entities, nil
}
