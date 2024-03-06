using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/challenge")]
    public class ChallengeController : BaseApiController
    {
        private readonly IChallengeService _challengeService;

        public ChallengeController(IChallengeService challengeService)
        {
            _challengeService = challengeService;
        }

        [HttpPost]
        public ActionResult<ChallengeDto> Create([FromBody] ChallengeDto challengeDto)
        {
            var result = _challengeService.Create(challengeDto);
            return CreateResponse(result);
        }
    }
}
