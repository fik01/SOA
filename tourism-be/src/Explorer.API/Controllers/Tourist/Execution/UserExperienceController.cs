using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Encounters.Core.UseCases;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist.Execution
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/userExperience")]
    public class UserExperienceController : BaseApiController
    {
        private readonly IUserExperienceService _userExperienceService;
        private readonly IChallengeExecutionService _challengeExecutionService;
        private IHttpClientFactory _httpClientFactory;

        public UserExperienceController(IUserExperienceService userExperienceService, IChallengeExecutionService challengeExecutionService, IHttpClientFactory httpClientFactory)
        {
            _userExperienceService = userExperienceService;
            _challengeExecutionService = challengeExecutionService;
            _httpClientFactory = httpClientFactory;
        }
        [HttpGet]
        public ActionResult<PagedResult<UserExperienceDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _userExperienceService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }
        [HttpPost]
        public ActionResult<UserExperienceDto> Create([FromBody] UserExperienceDto userExperience)
        {
            var result = _userExperienceService.Create(userExperience);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<UserExperienceDto> Update([FromBody] UserExperienceDto userExperience)
        {
            var result = _userExperienceService.Update(userExperience);
            return CreateResponse(result);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var result = _userExperienceService.Delete(id);
            return CreateResponse(result);
        }
        [HttpGet("userxp/{userId:long}")]
        public ActionResult<PagedResult<UserExperienceDto>> GetByUserId(long userId)
        {
            var result = _userExperienceService.GetByUserId(userId);
            return CreateResponse(result);
        }

        [HttpPut("addxp/{id:long}/{xp:int}")]
        public ActionResult<UserExperienceDto> AddXP(long id,int xp)
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri("https://localhost:8080/");
            var result = _userExperienceService.AddXP(id, xp);
            return CreateResponse(result);
        }
        [HttpPut("addxpsocial/{challengeId:long}/{xp:int}")]
        public ActionResult<UserExperienceDto> AddXPSocial(long challengeId, int xp)
        {
            var ids= _challengeExecutionService.GetUserIds(challengeId);
            Result<UserExperienceDto> result=new Result<UserExperienceDto>();
            foreach (var id in ids.Value) 
            {
                result = _userExperienceService.AddXP(_userExperienceService.GetByUserId(id).Value.Id, xp);
            }
            return CreateResponse(result);
        }
    }
}
