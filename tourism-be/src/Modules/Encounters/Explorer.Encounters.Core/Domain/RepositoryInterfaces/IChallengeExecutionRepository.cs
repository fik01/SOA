using Explorer.BuildingBlocks.Core.UseCases;

namespace Explorer.Encounters.Core.Domain.RepositoryInterfaces
{
    public interface IChallengeExecutionRepository : ICrudRepository<ChallengeExecution>
    {
        public int GetNumberOfTouristsByChallengeId(long challengeId);

        public ChallengeExecution GetByChallengeIdAndTouristId(long  challengeId, long touristId);

        public PagedResult<ChallengeExecution> GetPagedByKeyPointIds(List<int> tourKeyPointIds, int page, int pageSize);

        public PagedResult<ChallengeExecution> GetPagedByTouristId(long touristId, int page, int pageSize);

        public PagedResult<ChallengeExecution> GetIncompletePagedByChallengeId(long challengeId, int page, int pageSize);

        public void SaveChanges();
        public List<long> GetUserIds(long challengeId);
    }
}
