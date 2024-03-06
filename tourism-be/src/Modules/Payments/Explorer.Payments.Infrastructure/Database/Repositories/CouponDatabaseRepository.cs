using Explorer.BuildingBlocks.Core.Domain;
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
    public class CouponDatabaseRepository : ICouponRepository
    {
        private readonly PaymentsContext _dbContext;

        public CouponDatabaseRepository(PaymentsContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Coupon Create(Coupon entity)
        {
            _dbContext.Add(entity);
            _dbContext.SaveChanges();
            return entity;
        }
        public Coupon Update(Coupon entity)
        {
            try
            {
                _dbContext.Update(entity);
                _dbContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }
            return entity;
        }

        public void Delete(int id)
        {
            var entity = Get(id);
            _dbContext.Coupons.Remove(entity);
            _dbContext.SaveChanges();
        }

        public Coupon Get(long id)
        {
            var entity = _dbContext.Coupons.Find(id);
            if (entity == null) throw new KeyNotFoundException("Not found: " + id);
            return entity;
        }

        public PagedResult<Coupon> GetPagedByAuthorId(int page, int pageSize, int authorId)
        {
            var query = _dbContext.Coupons.Where(x => x.AuthorId == authorId);
            var result = query.GetPagedById(page, pageSize);
            return result.Result;
        }

        public Coupon? GetByCode(string code)
        {
             return _dbContext.Coupons.FirstOrDefault(x => x.Code == code);           
        }
    }
}
