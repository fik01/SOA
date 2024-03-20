using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Encounters.Core.Domain;
using Explorer.Encounters.Core.UseCases;
using Explorer.Stakeholders.API.Internal;
using Explorer.Stakeholders.Core.Domain;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Json;

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
        public async Task<ActionResult> Create([FromBody] UserExperienceDto userExperience)
        {
            var client = _httpClientFactory.CreateClient("encounters");
            using HttpResponseMessage response = await client.PostAsJsonAsync("newUserExperience", userExperience);

            //var result = _userExperienceService.Create(userExperience);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode);
            }
            var jsonResponse = await response.Content.ReadAsStringAsync();
            return Ok(jsonResponse);
        }

        [HttpPut("{id:int}")]
        public ActionResult<UserExperienceDto> Update([FromBody] UserExperienceDto userExperience)
        {
            var result = _userExperienceService.Update(userExperience);
            return CreateResponse(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var client = _httpClientFactory.CreateClient("encounters");
            using HttpResponseMessage response = await client.DeleteAsync($"deleteUserExperience/" + id.ToString());

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode);
            }
            //var userExperienceDto = await response.Content.ReadFromJsonAsync<UserExperienceDto>();
            return Ok("Deleted succesfully!");

            //var result = _userExperienceService.Delete(id);
            //return CreateResponse(result);
        }
        [HttpGet("userxp/{userId:long}")]
        public async Task<ActionResult> GetByUserId(int userId)
        {
            var client = _httpClientFactory.CreateClient("encounters");
            using HttpResponseMessage response = await client.GetAsync($"getUserExperience/" + userId.ToString());

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode);
            }
            var userExperienceDto = await response.Content.ReadFromJsonAsync<UserExperienceDto>();
            return Ok(userExperienceDto);

            //var result = _userExperienceService.GetByUserId(userId);
            //return CreateResponse(result);
        }

        [HttpPut("addxp/{id:int}/{xp:int}")]
        public async Task<ActionResult> AddXP(int id,int xp)
        {
            UserExperienceDto userExperienceDto = new UserExperienceDto();
            var client = _httpClientFactory.CreateClient("encounters");
            using HttpResponseMessage response = await client.PutAsJsonAsync($"addXP/" + id.ToString() + "/" + xp.ToString(), userExperienceDto);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode);
            }
            var jsonResponse = await response.Content.ReadAsStringAsync();
            return Ok(jsonResponse);

            //var result = _userExperienceService.AddXP(id, xp);
            //return CreateResponse(result);
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
