using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Dtos.ListedTours;
using Explorer.Payments.API.Public;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/shoppingcart")]
    public class BoughtItemController : BaseApiController
    {

        private IBoughtItemService _shoppingCartService;
        private ICouponService _couponService;
        private readonly IWalletService _walletService;

        public BoughtItemController(IBoughtItemService shoppingCartService, ICouponService couponService, IWalletService walletService)
        {
            _shoppingCartService = shoppingCartService;
            _couponService = couponService;
            _walletService = walletService;
        }

        [HttpGet]
        public ActionResult<BoughtItemDto> GetUnusedItems(long userId)
        {
            return CreateResponse(_shoppingCartService.GetUnusedTours(userId));
        }

        [AllowAnonymous]
        [HttpGet("{userId:long}")]
        public ActionResult<BoughtItemDto> GetUsedItems(long userId)
        {
            return CreateResponse(_shoppingCartService.GetUsedTours(userId));
        }

        [HttpPost("addToCart")]
        public ActionResult<BoughtItemDto> AddToCart([FromBody] List<BoughtItemDto> items, [FromQuery] int cost)
        {
            _walletService.SubFromBallance(items.First().UserId, cost);
            return CreateResponse(_shoppingCartService.Create(items));
        }

        [HttpDelete("deleteCartItem")]
        public ActionResult DeleteCartItem(long tourId, long userId)
        {
            return CreateResponse(_shoppingCartService.DeleteItem(tourId, userId));
        }

        [HttpPost("{userId:long}/{tourId:long}")]
        public ActionResult<JoinRequestDto> CheckStatus(long userId, long tourId)
        {
            var result = _shoppingCartService.UpdateItem(userId, tourId);
            return CreateResponse(result);
        }

        [HttpGet("coupon")]
        public ActionResult<CouponDto> GetCouponByCode(string code)
        {
            var result = _couponService.GetByCode(code);
            return CreateResponse(result);
        }

        [HttpPut("couponStatus/{id:int}")]
        public ActionResult<CouponDto> Update([FromBody] CouponDto equipment)
        {
            var result = _couponService.Update(equipment);
            return CreateResponse(result);
        }

        [HttpGet("getWallet")]
        public ActionResult GetWalletByUserId([FromQuery] int userId)
        {
            return CreateResponse(_walletService.GetByUserId(userId));
        }
        
        [HttpGet("boughtTours/{touristId:long}")]
        public ActionResult<PagedResult<ListedTourDto>> GetPagedBoughtToursByTouristId(long touristId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _shoppingCartService.GetPagedToursByTouristId(touristId, page, pageSize);
            return CreateResponse(result);
        }
    }
}
 