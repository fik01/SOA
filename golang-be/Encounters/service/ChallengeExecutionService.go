package service

// "database-example/model"
// "database-example/repo"

// type ChallengeExecutionService struct {
//     ChallengeExecutionRepo *repo.ChallengeExecutionRepository
// }

// func NewChallengeExecutionService(repo *repo.ChallengeExecutionRepository) *ChallengeExecutionService {
//     return &ChallengeExecutionService{
//         ChallengeExecutionRepo: repo,
//     }
// }

// func (service *ChallengeExecutionService) Complete(challengeId, touristId int64) (model.ChallengeExecution, error) {
//     challengeExecution, err := service.ChallengeExecutionRepo.GetByChallengeIdAndTouristId(challengeId, touristId)
//     if err != nil {
//         return model.ChallengeExecution{}, err
//     }
//     challengeExecution.Complete()
//     err = service.ChallengeExecutionRepo.SaveChanges()
//     if err != nil {
//         return model.ChallengeExecution{}, err
//     }
//     return challengeExecution, nil
// }

// func (service *ChallengeExecutionService) GetPagedByKeyPointIds(tourKeyPointIds []int, page, pageSize int) ([]model.ChallengeExecution, error) {
//     challengeExecutions, err := service.ChallengeExecutionRepo.GetPagedByKeyPointIds(tourKeyPointIds, page, pageSize)
//     if err != nil {
//         return nil, err
//     }
//     return challengeExecutions, nil
// }