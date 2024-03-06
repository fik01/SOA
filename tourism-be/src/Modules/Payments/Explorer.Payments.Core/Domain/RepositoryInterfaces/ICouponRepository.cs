using Explorer.BuildingBlocks.Core.UseCases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain.RepositoryInterfaces
{
    public interface ICouponRepository
    {
        public Coupon Create(Coupon entity);
        public Coupon Update(Coupon entity);
        public void Delete(int id);
        public PagedResult<Coupon> GetPagedByAuthorId(int page, int pageSize, int authorId);
        public Coupon Get(long id);
        public Coupon? GetByCode(string code);
    }
}
