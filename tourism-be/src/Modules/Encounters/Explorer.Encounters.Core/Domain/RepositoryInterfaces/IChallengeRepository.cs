using Explorer.BuildingBlocks.Core.UseCases;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Core.Domain.RepositoryInterfaces
{
    public interface IChallengeRepository : ICrudRepository<Challenge>
    {
        public PagedResult<Challenge> GetPagedByKeyPointIds(List<int> tourKeyPointIds, int page, int pageSize);
    }
}
