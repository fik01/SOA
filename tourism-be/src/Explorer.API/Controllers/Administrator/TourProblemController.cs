using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Administrator
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administrator/tourProblem")]
    public class TourProblemController : BaseApiController
    {
        private readonly ITourProblemService _problemService;

        public TourProblemController(ITourProblemService problemService)
        {
            _problemService = problemService;
        }

        [HttpGet]
        public ActionResult<PagedResult<TourProblemDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _problemService.GetPaged(page, pageSize);
            _problemService.FindNames(result.Value.Results);
            return CreateResponse(result);
        }
        [HttpPut]
        public ActionResult<TourProblemDto> GiveDeadline([FromBody] TourProblemDto tp)
        {
            var result = _problemService.GiveDeadline(tp.Deadline, tp.Id);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<TourProblemDto> PunishAuthor([FromBody] TourProblemDto tp)
        {
            var result = _problemService.PunishAuthor(tp.AuthorUsername, tp.TourId, tp.Id);
            return CreateResponse(result);
        }
    }
}