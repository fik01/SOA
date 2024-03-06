using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Encounters.Core.Domain;
using Explorer.Encounters.Core.Domain.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Infrastructure.Database.Repositories
{
    public class ChallengeDatabaseRepository : CrudDatabaseRepository<Challenge, EncountersContext>, IChallengeRepository
    {
        private readonly DbSet<Challenge> _dbSet;
        public ChallengeDatabaseRepository(EncountersContext dbContext) : base(dbContext)
        {
            _dbSet = DbContext.Set<Challenge>();
        }

        public PagedResult<Challenge> GetPagedByKeyPointIds(List<int> tourKeyPointIds, int page, int pageSize)
        {
            var task = _dbSet
                .Where(ce => tourKeyPointIds.Contains((int?)ce.KeyPointId ?? 0))
                .GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }
    }
}
