using Explorer.Payments.API.Dtos;
using Explorer.Payments.Core.Domain.DomainDtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain.DomainServicesInterface
{
    public interface IAuthorEarningsDomainService
    {
        public Result<double> CalculateTotalEarnings(long authorId, List<Coupon> coupons);
        public Result<List<AuthorEarningsDomainDto>> CalculateEarningsByTours(long authorId, List<Coupon> coupons);
    }
}
