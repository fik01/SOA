using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Encounters.Core.Domain;
using Explorer.Encounters.Core.Domain.RepositoryInterfaces;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace Explorer.Encounters.Infrastructure.Database.Repositories
{
    public class ChallengeExecutionDatabaseRepository : IChallengeExecutionRepository
    {
        private readonly EncountersContext DbContext;
        private readonly DbSet<ChallengeExecution> _dbSet;
        public ChallengeExecutionDatabaseRepository(EncountersContext dbContext)
        {
            DbContext = dbContext;
            _dbSet = DbContext.Set<ChallengeExecution>();
        }

        public ChallengeExecution Create(ChallengeExecution entity)
        {
            _dbSet.Add(entity);
            DbContext.SaveChanges();
            return entity;
        }

        public void Delete(long id)
        {
            var entity = Get(id);
            _dbSet.Remove(entity);
            DbContext.SaveChanges();
        }

        public ChallengeExecution Get(long id)
        {
            var challengeExecution = _dbSet
                .Where(ce => ce.Id == id)
                .Include(ce => ce.Challenge)
                .FirstOrDefault();
            return challengeExecution ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public PagedResult<ChallengeExecution> GetPaged(int page, int pageSize)
        {
            var task = _dbSet
                .Include(ce => ce.Challenge)
                .GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public ChallengeExecution Update(ChallengeExecution entity)
        {
            try
            {
                DbContext.Update(entity);
                DbContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }
            return entity;
        }

        public ChallengeExecution GetByChallengeIdAndTouristId(long challengeId, long touristId)
        {
            var challengeExecution = _dbSet.Include(ce => ce.Challenge).SingleOrDefault(ce => ce.Challenge.Id == challengeId && ce.TouristId == touristId);
            return challengeExecution ?? throw new KeyNotFoundException($"Not found: challengeId={challengeId}, touristId={touristId}");
        }

        public int GetNumberOfTouristsByChallengeId(long challengeId)
        {
            return _dbSet.Include(ce => ce.Challenge).Where(ce => ce.Challenge.Id == challengeId && !ce.IsCompleted).Count();
        }

        public void SaveChanges()
        {
            DbContext.SaveChanges();
        }

        public PagedResult<ChallengeExecution> GetPagedByKeyPointIds(List<int> tourKeyPointIds, int page, int pageSize)
        {
            var task = _dbSet
                .Include(ce => ce.Challenge)
                .Where(ce => tourKeyPointIds.Contains((int?)ce.Challenge.KeyPointId ?? 0))
                .GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public PagedResult<ChallengeExecution> GetPagedByTouristId(long touristId, int page, int pageSize)
        {
            var task = _dbSet
                .Include(ce => ce.Challenge)
                .Where(ce => ce.TouristId == touristId)
                .GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public PagedResult<ChallengeExecution> GetIncompletePagedByChallengeId(long challengeId, int page, int pageSize)
        {
            var task = _dbSet
                .Include(ce => ce.Challenge)
                .Where(ce => ce.ChallengeId == challengeId && !ce.IsCompleted)
                .GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public List<long> GetUserIds(long challengeId)
        {
            var tasks = _dbSet.GetPaged(0, 0);
            List<long> ids = new List<long>();
            foreach (var task in tasks.Result.Results)
            {
                if(task.ChallengeId==challengeId)
                    ids.Add(task.TouristId);
            }
            return ids;
        }
    }
}
