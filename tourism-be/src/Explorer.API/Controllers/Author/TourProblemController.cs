using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/tourProblem")]
    public class TourProblemController : BaseApiController
    {
        private readonly ITourProblemService _problemService;

        public TourProblemController(ITourProblemService problemService)
        {
            _problemService = problemService;
        }

        [HttpGet("{authorId:long}")]
        public ActionResult<PagedResult<TourProblemDto>> GetByAuthorId(long authorId)
        {
            var result = _problemService.GetByAuthorId(authorId);
            _problemService.FindNames(result.Value);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<TourProblemDto> Update([FromBody] TourProblemDto tourProblem)
        {
            var result = _problemService.Update(tourProblem);
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