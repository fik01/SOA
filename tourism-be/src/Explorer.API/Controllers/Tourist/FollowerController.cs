using Explorer.Encounters.API.Dtos;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;

namespace Explorer.API.Controllers.Tourist.Identity
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/follower")]
    public class FollowerController : BaseApiController
    {
        private readonly IFollowerService _followerService;
        private IHttpClientFactory _httpClientFactory;

        public FollowerController(IFollowerService followerService, IHttpClientFactory httpClientFactory)
        {
            _followerService = followerService;
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("{id:int}")]
        public ActionResult<List<FollowerDto>> GetFollowersNotifications(int id)
        {
            var result = _followerService.GetFollowersNotifications(id);
            return CreateResponse(result);
        }

        /*
        [HttpPut]
        public ActionResult<FollowerDto> Create([FromBody] FollowerDto follower)
        {
            var result = _followerService.Create(follower);
            return CreateResponse(result);
        }
        */
        
        [HttpPut]
        public async Task<ActionResult<FollowerDto>> Create([FromBody] FollowerDto follower)
        {
            var client = _httpClientFactory.CreateClient("encounters");

            var response = await client.PutAsJsonAsync("tourist/follower", follower);

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode);  
            }
            var jsonResponse = await response.Content.ReadAsStringAsync();
            return Ok(jsonResponse);

        }
        
        [HttpDelete("{followerId:int}/{followedId:int}")]
        public ActionResult Delete(int followerId, int followedId)
        {
            var result = _followerService.Delete(followerId, followedId);
            return CreateResponse(result);
        }

        [HttpGet("followings/{id:int}")]
        public ActionResult<List<FollowerDto>> GetFollowings(int id)
        {
            var result = _followerService.GetFollowings(id);
            return CreateResponse(result);
        }
    }
}
