using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.API.Internal;
using Explorer.Tours.API.Public.Administration;
using FluentResults;

namespace Explorer.Payments.Core.UseCases;

public class CouponService : BaseService<CouponDto, Coupon>, ICouponService
{
    private readonly ICouponRepository _couponRepository;
    private ICouponUsedService couponUsedService;
    public CouponService(IMapper mapper, ICouponRepository couponRepository, ICouponUsedService couponUsedService) : base(mapper)
    {
        _couponRepository = couponRepository;
        this.couponUsedService = couponUsedService;
    }

    public Result<CouponDto> Create(CouponDto coupon)
    {
        var result = _couponRepository.Create(MapToDomain(coupon));
        return MapToDto(result);
    }

    public Result<CouponDto> GetByCode(string code)
    {        
       
            var result = _couponRepository.GetByCode(code);
            return MapToDto(result);
       
    }

    public Result<CouponDto> Update(CouponDto coupon)
    {
        try
        {
            var result = _couponRepository.Update(MapToDomain(coupon));
            CouponUsedDto newEventDto = new CouponUsedDto
            {
                Code = result.Code,
                DateOfUsing = DateTime.UtcNow
            };
            couponUsedService.Create(newEventDto);
            return MapToDto(result);
        }
        catch (KeyNotFoundException e)
        {
            return Result.Fail(FailureCode.NotFound).WithError(e.Message);
        }
        catch (ArgumentException e)
        {
            return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
        }
    }

    public Result Delete(int id)
    {
        try
        {
            _couponRepository.Delete(id);
            return Result.Ok();
        }
        catch (KeyNotFoundException e)
        {
            return Result.Fail(FailureCode.NotFound).WithError(e.Message);
        }
    }

    public Result<PagedResult<CouponDto>> GetPagedByAuthorId(int page, int pageSize, int authorId)
    {
        var result = _couponRepository.GetPagedByAuthorId(page, pageSize, authorId);
        return MapToDto(result);
    }
}