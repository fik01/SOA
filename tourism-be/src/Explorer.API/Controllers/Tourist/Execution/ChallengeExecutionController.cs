using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Tours.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist.Execution
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/challengeExecution")]
    public class ChallengeExecutionController : BaseApiController
    {
        private readonly IChallengeExecutionService _challengeExecutionService;

        public ChallengeExecutionController(IChallengeExecutionService challengeExecutionService)
        {
            _challengeExecutionService = challengeExecutionService;
        }

        [HttpGet]
        public ActionResult<PagedResult<ChallengeExecutionDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _challengeExecutionService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }


        [HttpPost]
        public ActionResult<ChallengeExecutionDto> Create([FromBody] ChallengeExecutionDto challengeExecution)
        {
            var result = _challengeExecutionService.Create(challengeExecution);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ChallengeExecutionDto> Update([FromBody] ChallengeExecutionDto challengeExecution)
        {
            var result = _challengeExecutionService.Update(challengeExecution);
            return CreateResponse(result);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var result = _challengeExecutionService.Delete(id);
            return CreateResponse(result);
        }

        [HttpPost("tour")]
        public ActionResult GetPagedByTour([FromQuery] int page, [FromQuery] int pageSize, [FromBody] TourDto tour)
        {
            var result = _challengeExecutionService.GetPagedByKeyPointIds(tour.KeyPoints.Select(kp => kp.Id).ToList(), page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{touristId:int}")]
        public ActionResult GetPagedByTouristId(int touristId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _challengeExecutionService.GetPagedByTouristId(touristId, page, pageSize);
            return CreateResponse(result);
        }

        //[HttpGet("userids/{challengeId:long}")]
        //public ActionResult GetPagedByTouristId(long challengeId)
        //{
        //    var result = _challengeExecutionService.GetUserIds(challengeId);
        //    return CreateResponse(result);
        //}
    }
}
