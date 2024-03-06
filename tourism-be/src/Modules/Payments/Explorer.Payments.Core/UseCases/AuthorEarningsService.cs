using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.DomainServicesInterface;
using Explorer.Tours.API.Internal;
using FluentResults;

namespace Explorer.Payments.Core.UseCases
{
    public class AuthorEarningsService : BaseService<AuthorEarningsDto, BoughtItem>, IAuthorEarningsService
    {
        private IInternalTourService _internalTourUsageService;
        private IBoughtItemService _boughtItemService;
        private ICouponService _couponService;
        private IAuthorEarningsDomainService _authorEarningsDomainService;

        public AuthorEarningsService(IMapper mapper, IInternalTourService internalTourUsageService, IBoughtItemService boughtItemService, ICouponService couponService, IAuthorEarningsDomainService authorEarningsDomainService) : base(mapper)
        {
            _internalTourUsageService = internalTourUsageService;
            _boughtItemService = boughtItemService;
            _couponService = couponService;
            _authorEarningsDomainService = authorEarningsDomainService;
        }

        //public Result<List<AuthorEarningsDto>> CalculateEarningsByTours(long authorId)
        //{
        //    List<AuthorEarningsDto> dtos = new List<AuthorEarningsDto>();
        //    List<BoughtItemDto> boughtItems = _boughtItemService.GetAll().Value;
        //    var coupons = _couponService.GetPagedByAuthorId(0, 0, Convert.ToInt32(authorId));
        //    foreach (var d in boughtItems)
        //    {
        //        var tour = _internalTourUsageService.Get(Convert.ToInt32(d.TourId));
        //        AuthorEarningsDto authorEarningsDto = new AuthorEarningsDto();
        //        if (tour.Value.AuthorId == authorId)
        //        {
        //            var alreadyExists = dtos.Find(a => a.TourId == tour.Value.Id);
        //            double withDiscount = tour.Value.Price;
        //            if (dtos.Contains(alreadyExists))
        //            {
        //                foreach (var c in coupons.Value.Results)
        //                {
        //                    if (c.TourId == alreadyExists.TourId && c.IsUsed)
        //                    {
        //                        withDiscount *= 1 - c.Discount;
        //                        coupons.Value.Results.Remove(c);
        //                        break;
        //                    }
        //                }
        //                alreadyExists.Earning += withDiscount;
        //            }
        //            else
        //            {
        //                foreach (var c in coupons.Value.Results)
        //                {
        //                    if (c.TourId == tour.Value.Id && c.IsUsed)
        //                    {
        //                        withDiscount *= 1 - c.Discount;
        //                        coupons.Value.Results.Remove(c);
        //                        break;
        //                    }
        //                }
        //                authorEarningsDto.Earning += withDiscount;
        //                authorEarningsDto.TourId = tour.Value.Id;
        //                authorEarningsDto.AuthorId = authorId;
        //                authorEarningsDto.TourName = tour.Value.Name;
        //                dtos.Add(authorEarningsDto);
        //            }
        //        }
        //    }
        //    return dtos.ToResult();
        //}
        public List<Coupon> GetCoupons(long authorId) 
        {
            var coupons = _couponService.GetPagedByAuthorId(0, 0, Convert.ToInt32(authorId)).Value.Results;
            List<Coupon> trueCoupons = new List<Coupon>();
            foreach (var c in coupons)
            {
                Coupon coupon = new Coupon();
                if (c.TourId != null)
                {
                    coupon.SetTourIdForDto(c.TourId.Value);
                    coupon.SetDiscountForDto(c.Discount);
                    coupon.SetIsUsedForDto(c.IsUsed);
                    trueCoupons.Add(coupon);
                }
            }
            return trueCoupons;
        }
        public Result<PagedResult<AuthorEarningsDto>> CalculateEarningsByTours(long authorId)
        {
            
            var list= _authorEarningsDomainService.CalculateEarningsByTours(authorId,GetCoupons(authorId));
            PagedResult<AuthorEarningsDto> authorEarningsDtos = new PagedResult<AuthorEarningsDto>(new List<AuthorEarningsDto>(), 0);
            foreach(var l in list.Value)
            {
                AuthorEarningsDto authorEarningsDto=new AuthorEarningsDto(l.AuthorId,l.Earning,l.TourId,l.TourName);
                authorEarningsDtos.Results.Add(authorEarningsDto);
            }
            return authorEarningsDtos;
        }

        public Result<double> CalculateTotalEarnings(long authorId)
        {
            return _authorEarningsDomainService.CalculateTotalEarnings(authorId, GetCoupons(authorId));
        }
    }
}
