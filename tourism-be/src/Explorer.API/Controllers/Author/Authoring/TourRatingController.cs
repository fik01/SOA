using Explorer.Tours.API.Dtos.Statistics;
using Explorer.Tours.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author.Authoring
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/tourrating")]
    public class TourRatingController : BaseApiController
    {
        private readonly ITourRatingService _tourRatingService;

        public TourRatingController(ITourRatingService tourRatingService)
        {
            _tourRatingService = tourRatingService;
        }

        [HttpGet("getBestRatedStats")]
        public ActionResult<List<TourStatisticsDto>> GetBestRatedStatistics()
        {
            var result = _tourRatingService.GetBestRatedStatistics();
            return CreateResponse(result);
        }
    }
}
