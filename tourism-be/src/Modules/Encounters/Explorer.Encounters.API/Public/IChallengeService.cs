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
    public interface IChallengeService
    {
        Result<PagedResult<ChallengeDto>> GetPaged(int page, int pageSize);
        Result<ChallengeDto> Create(ChallengeDto challengeDto);
        Result<ChallengeDto> Update(ChallengeDto challengeDto);
        Result Delete(int id);
        Result<ChallengeDto> Get(int id);

        Result<PagedResult<ChallengeDto>> GetPagedByKeyPointIds(int page, int pageSize, List<int> keyPointIds);
    }
}
