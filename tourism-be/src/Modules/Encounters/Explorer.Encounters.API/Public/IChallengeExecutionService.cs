using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.API.Public
{
    public interface IChallengeExecutionService
    {
        Result<PagedResult<ChallengeExecutionDto>> GetPaged(int page, int pageSize);
        Result<ChallengeExecutionDto> Create(ChallengeExecutionDto challengeDto);
        Result<ChallengeExecutionDto> Update(ChallengeExecutionDto challengeDto);
        Result Delete(int id);
        Result<ChallengeExecutionDto> Get(int id);

        Result<ChallengeExecutionDto> Complete(long touristId, long challengeId);

        Result<PagedResult<ChallengeExecutionDto>> GetPagedByKeyPointIds(List<int> keyPointIds, int page, int pageSize);

        Result<PagedResult<ChallengeExecutionDto>> GetPagedByTouristId(long touristId, int page, int pageSize);
        Result<List<long>> GetUserIds(long challengeId);
    }
}
