using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Infrastructure.Database.Repositories
{
    public class BundleRepository : IBundleRepository
    {
        private readonly PaymentsContext DbContext;
        private readonly DbSet<Bundle> _dbSet;

        public BundleRepository(PaymentsContext dbContext)
        {
            DbContext = dbContext;
            _dbSet = DbContext.Set<Bundle>();
        }

        public Bundle Create(Bundle entity)
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

        public Bundle Get(long id)
        {
            var bundle = _dbSet
                .Where(b => b.Id == id)
                .FirstOrDefault();
            return bundle ?? throw new KeyNotFoundException("Not found: " + id);
        }

        public PagedResult<Bundle> GetPaged(int page, int pageSize)
        {
            var task = _dbSet.GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public void SaveChanges()
        {
            DbContext.SaveChanges();
        }

        public Bundle Update(Bundle entity)
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

        public PagedResult<Bundle> GetPagedByAuthorId(int authorId, int page, int pageSize)
        {
            var task = _dbSet.Where(b => b.AuthorId == authorId).GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }
    }
}
