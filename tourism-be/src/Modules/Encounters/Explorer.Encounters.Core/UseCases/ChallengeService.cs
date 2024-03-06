using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Encounters.Core.Domain;
using Explorer.Encounters.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Core.UseCases
{
    public class ChallengeService : CrudService<ChallengeDto, Challenge>, IChallengeService
    {
        private readonly IChallengeRepository _challengeRepository;
        public ChallengeService(IChallengeRepository challengeRepository, IMapper mapper) : base(challengeRepository, mapper)
        {
            _challengeRepository = challengeRepository;
        }

        public Result<PagedResult<ChallengeDto>> GetPagedByKeyPointIds(int page, int pageSize, List<int> keyPointIds)
        {
            var result = _challengeRepository.GetPagedByKeyPointIds(keyPointIds, page, pageSize);
            return MapToDto(result);
        }
    }
}
