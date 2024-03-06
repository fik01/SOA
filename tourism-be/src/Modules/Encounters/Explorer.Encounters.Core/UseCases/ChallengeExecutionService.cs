using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Encounters.Core.Domain;
using Explorer.Encounters.Core.Domain.RepositoryInterfaces;
using FluentResults;

namespace Explorer.Encounters.Core.UseCases
{
    public class ChallengeExecutionService : CrudService<ChallengeExecutionDto, ChallengeExecution>, IChallengeExecutionService
    {
        private readonly IChallengeExecutionRepository _challengeExecutionRepository;
        public ChallengeExecutionService(IChallengeExecutionRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _challengeExecutionRepository = repository;
        }

        public Result<ChallengeExecutionDto> Complete(long challengeId, long touristId)
        {
            try
            {
                var challengeExecution = _challengeExecutionRepository.GetByChallengeIdAndTouristId(challengeId, touristId);
                challengeExecution.Complete();
                _challengeExecutionRepository.SaveChanges();
                return MapToDto(challengeExecution);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }

        public Result<PagedResult<ChallengeExecutionDto>> GetPagedByKeyPointIds(List<int> keyPointIds, int page, int pageSize)
        {
            var result = _challengeExecutionRepository.GetPagedByKeyPointIds(keyPointIds, page, pageSize);
            return MapToDto(result);
        }

        public Result<PagedResult<ChallengeExecutionDto>> GetPagedByTouristId(long touristId, int page, int pageSize)
        {
            var result = _challengeExecutionRepository.GetPagedByTouristId(touristId, page, pageSize);
            return MapToDto(result);
        }

        public override Result<ChallengeExecutionDto> Create(ChallengeExecutionDto entity)
        {
            try
            {
                var result = _challengeExecutionRepository.Create(MapToDomain(entity));
                result = _challengeExecutionRepository.Get(result.Id);
                if (result.Challenge.Type == ChallengeType.Social)
                {
                    if (_challengeExecutionRepository.GetNumberOfTouristsByChallengeId(result.ChallengeId) >= result.Challenge.RequiredAttendance)
                    {
                        result.Complete();
                        _challengeExecutionRepository.SaveChanges();
                        foreach (var execution in _challengeExecutionRepository.GetIncompletePagedByChallengeId(result.ChallengeId, 0, 0).Results)
                        {
                            execution.Complete();
                            _challengeExecutionRepository.SaveChanges();
                        }
                    }

                }
                return MapToDto(result);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }

        public override Result<ChallengeExecutionDto> Update(ChallengeExecutionDto entity)
        {
            try
            {
                var result = CrudRepository.Update(MapToDomain(entity));
                if (result.Challenge.Type == ChallengeType.Social)
                {
                    if (_challengeExecutionRepository.GetNumberOfTouristsByChallengeId(result.ChallengeId) >= result.Challenge.RequiredAttendance)
                    {
                        result.Complete();
                        _challengeExecutionRepository.SaveChanges();
                        foreach (var execution in _challengeExecutionRepository.GetIncompletePagedByChallengeId(result.ChallengeId, 0, 0).Results)
                        {
                            execution.Complete();
                            _challengeExecutionRepository.SaveChanges();
                        }
                    }

                }
                return MapToDto(result);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }
        public Result<List<long>> GetUserIds(long challengeId)
        {
            return _challengeExecutionRepository.GetUserIds(challengeId);
        }
    }
}
