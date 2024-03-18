using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Tours.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace Explorer.API.Controllers.Tourist.Execution
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/challengeExecution")]
    public class ChallengeExecutionController : BaseApiController
    {
        private readonly IChallengeExecutionService _challengeExecutionService;
        private IHttpClientFactory _httpClientFactory;

        public ChallengeExecutionController(IChallengeExecutionService challengeExecutionService, IHttpClientFactory httpClientFactory)
        {
            _challengeExecutionService = challengeExecutionService;
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public ActionResult<PagedResult<ChallengeExecutionDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _challengeExecutionService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }


        [HttpPost]
        public async Task<ActionResult> Create([FromBody] ChallengeExecutionDto challengeExecution)
        {
            var client = _httpClientFactory.CreateClient("encounters");
            using HttpResponseMessage response = await client.PostAsJsonAsync("tourist/challengeExecution", challengeExecution);

            //var result = _challengeExecutionService.Create(challengeExecution);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode);
            }
            var jsonResponse = await response.Content.ReadAsStringAsync();
            return Ok(jsonResponse);
        }

/*        
        [HttpPost]
        public ActionResult<ChallengeExecutionDto> Create([FromBody] ChallengeExecutionDto challengeExecution)
        {
            var result = _challengeExecutionService.Create(challengeExecution);
            return CreateResponse(result);
        }
*/        

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
