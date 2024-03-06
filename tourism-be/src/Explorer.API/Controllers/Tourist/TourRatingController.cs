using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.UseCases;
using Explorer.Tours.Core.UseCases.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/tourrating")]
    public class TourRatingController : BaseApiController
    {
        private readonly ITourRatingService _ratingService;

        public TourRatingController(ITourRatingService ratingService)
        {
            _ratingService = ratingService;
        }

        [HttpGet]
        public ActionResult<PagedResult<TourRatingDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _ratingService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<TourRatingDto> Get(int id)
        {
            var result = _ratingService.Get(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<TourRatingDto> Create([FromBody] TourRatingDto rating)
        {
            var result = _ratingService.Create(rating);
            return CreateResponse(result);
        }

        [HttpGet("tour/{tourId:int}")]
        public ActionResult<PagedResult<TourRatingDto>> GetByTourId(int tourId)
        {
            var result = _ratingService.GetByTourId(tourId);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<TourRatingDto> Update([FromBody] TourRatingDto rating)
        {
            var result = _ratingService.Update(rating);
            return CreateResponse(result);
        }

        [HttpGet("getByPersonIdAndTourId/{personId:long}/{tourId:long}")]
        public ActionResult<TourRatingDto> GetByPersonIdAndTourId(long personId, long tourId)
        {
            var result = _ratingService.GetByPersonIdAndTourId(personId, tourId);
            return CreateResponse(result);
        }
    }
}
