using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Infrastructure.Authentication;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.UseCases;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/tourProblem")]
    public class TourProblemController : BaseApiController
    {
        private readonly ITourProblemService _problemService;

        public TourProblemController(ITourProblemService problemService)
        {
            _problemService = problemService;
        }

        [HttpPost]
        public ActionResult<TourProblemDto> Create([FromBody] TourProblemDto tourProblem)
        {
            var result = _problemService.Create(tourProblem);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<TourProblemDto> Update([FromBody] TourProblemDto tourProblem)
        {
            var result = _problemService.Update(tourProblem);
            return CreateResponse(result);
        }

        [HttpGet("{touristId:long}")]
        public ActionResult<PagedResult<TourProblemDto>> GetByTouristId(long touristId)
        {
            var result = _problemService.GetByTouristId(touristId);
            _problemService.FindNames(result.Value);
            return CreateResponse(result);
        }

        [HttpGet("messages/{userId:long}")]
        public ActionResult<PagedResult<TourProblemMessageDto>> GetUnreadMessages(long userId)
        {
            var result = _problemService.GetUnreadMessages(userId);
            return CreateResponse(result);
        }
    }
}