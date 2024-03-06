using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.Core.Domain.Tours;

namespace Explorer.Tours.Core.Domain.RepositoryInterfaces
{
    public interface ITourRepository : ICrudRepository<Tour>
    {
        void SaveChanges();
        PagedResult<Tour> GetPagedByAuthorId(int authorId, int page, int pageSize);
        PagedResult<Tour> GetPagedByIds(List<int> ids, int page, int pageSize);
    }
}
