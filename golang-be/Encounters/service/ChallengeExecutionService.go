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

func (service *ChallengeExecutionService) GetPagedByKeyPointIds(keyPointIds []int, page, pageSize int) ([]model.ChallengeExecution, error) {
	results, err := service.ChallengeExecutionRepository.GetPagedByKeyPointIds(keyPointIds, page, pageSize)
	if err != nil {
		return nil, fmt.Errorf("failed to get paged challenge executions by key point IDs: %w", err)
	}
	return results, nil
}

func (service *ChallengeExecutionService) GetPagedByTouristId(touristId int64, page, pageSize int) ([]model.ChallengeExecution, error) {
	results, err := service.ChallengeExecutionRepository.GetPagedByTouristId(touristId, page, pageSize)
	if err != nil {
		return nil, fmt.Errorf("failed to get paged challenge executions by tourist ID: %w", err)
	}
	return results, nil
}

func (service *ChallengeExecutionService) Create(entity *model.ChallengeExecution) error {
	if err := service.ChallengeExecutionRepository.Create(entity); err != nil {
		return fmt.Errorf("failed to create challenge execution: %w", err)
	}

	// Provera da li je Challenge inicijalizovan
	if entity.Challenge != nil && entity.Challenge.Type == model.Social {
		numTourists := service.ChallengeExecutionRepository.GetNumberOfTouristsByChallengeId(entity.ChallengeId)

		if numTourists >= *entity.Challenge.RequiredAttendance {
			entity.Complete()
			if err := service.ChallengeExecutionRepository.SaveChanges(); err != nil {
				return fmt.Errorf("failed to save changes after completing challenge execution: %w", err)
			}

			// Za sve nepotpune izvršaje za isti izazov
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

func (service *ChallengeExecutionService) Update(entity *model.ChallengeExecution) error {
	if err := service.ChallengeExecutionRepository.Update(entity); err != nil {
		return fmt.Errorf("failed to update challenge execution: %w", err)
	}

	// Provjera tipa izazova i završetak ako je potrebno
	if entity.Challenge.Type == model.Social { // Pretpostavka: model.Social je konstanta koja odgovara tipu "Social"
		numTourists := service.ChallengeExecutionRepository.GetNumberOfTouristsByChallengeId(entity.ChallengeId)

		// Provjera ima li greške u dohvaćanju broja turista
		if numTourists < 0 {
			return fmt.Errorf("failed to get number of tourists for challenge execution")
		}

		if numTourists >= *entity.Challenge.RequiredAttendance {
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

func (service *ChallengeExecutionService) GetUserIds(challengeId int64) ([]int64, error) {
	userIds, err := service.ChallengeExecutionRepository.GetUserIds(challengeId)
	if err != nil {
		return nil, fmt.Errorf("failed to get user IDs for challenge execution: %w", err)
	}
	return userIds, nil
}
