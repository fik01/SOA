using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using FluentResults;

namespace Explorer.Payments.API.Public;

public interface ICouponService
{
    Result<PagedResult<CouponDto>> GetPagedByAuthorId(int page, int pageSize, int authorId);
    Result<CouponDto> Create(CouponDto coupon);
    Result<CouponDto> Update(CouponDto coupon);
    Result Delete(int id);
    Result<CouponDto>? GetByCode(string code);
}