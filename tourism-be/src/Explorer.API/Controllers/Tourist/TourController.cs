using Explorer.Blog.API.Dtos;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Infrastructure.Authentication;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Authoring;
using Explorer.Tours.Core.UseCases;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Xml.Linq;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/tour")]
    public class TourController : BaseApiController
    {
        private readonly ITourService _tourService;
        private readonly IRecommenderService _recommenderService;
        private static HttpClient _httpClient;

        public TourController(ITourService tourService, IRecommenderService recommenderService)
        {
            _tourService = tourService;
            _recommenderService = recommenderService;
            var service = Environment.GetEnvironmentVariable("GO_TOUR_SERVICE_HOST") ?? "localhost";
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri($"http://{service}:8080"),
            };
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<PagedResult<TourDto>>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var jsonResponse = await GetAllToursAsync(_httpClient);
            var tourDtos = JsonConvert.DeserializeObject<List<TourDto>>(jsonResponse);

            int total = 0;
            foreach (var ex in tourDtos)
            {
                total++;
            }

            var pagedResult = new PagedResult<TourDto>(tourDtos, total);

            return pagedResult;
        }

        static async Task<string> GetAllToursAsync(HttpClient httpClient)
        {
            using HttpResponseMessage response = await httpClient.GetAsync("getTours");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        [AllowAnonymous]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<TourDto>> Get(int id)
        {
            var jsonResponse = await GetAsync(_httpClient, id);
            var tourDto = JsonConvert.DeserializeObject<TourDto>(jsonResponse);
            return tourDto;
        }

        static async Task<string> GetAsync(HttpClient httpClient, int id)
        {
            string url = $"get?id={id}";
            using HttpResponseMessage response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        [HttpPost]
        public ActionResult<TourDto> CreateCampaign([FromBody] CampaignDto campaignDto)
        {
            var result = _tourService.CreateCampaign(campaignDto.Tours, campaignDto.Name, campaignDto.Description, campaignDto.TouristId);
            return CreateResponse(result);
        }

        [HttpGet("search/{name}/{tags}")]
        public ActionResult<PagedResult<TourDto>> Search([FromQuery] int page, [FromQuery] int pageSize, [FromRoute] string name, [FromRoute] string[] tags)
        {
            var result = _tourService.GetPagedForSearch(name, tags, page, pageSize);
            return CreateResponse(result);
        }
        
        [HttpGet("recommended/{touristId:int}")]
        public ActionResult<PagedResult<TourDto>> GetRecommendedToursForTourist([FromQuery] int page, [FromQuery] int pageSize, [FromRoute] int touristId)
        {
            var result = _recommenderService.GetRecommendedToursByLocationForTourist(page, pageSize, touristId);
            return CreateResponse(result);
        }

        [HttpGet("recommendedByFollowing/{tourId:int}/{userId:int}")]
        
        public ActionResult<PagedResult<TourDto>> GetRecommendedToursFromFollowings(int tourId, int userId)
        {
            var result = _recommenderService.GetRecommendedToursFromFollowings(tourId, userId);
            return CreateResponse(result);
        }


        [HttpGet("active/{touristId:int}")]
        public ActionResult<PagedResult<TourDto>> GetActiveToursForTourist([FromQuery] int page, [FromQuery] int pageSize, [FromRoute] int touristId)
        {
            var result = _recommenderService.GetActiveToursByLocationForTourist(page, pageSize, touristId);
            return CreateResponse(result);
        }
        [HttpPost("sendEmail/{userId:int}")]
        public ActionResult<bool> SendEmail(int userId, [FromQuery] string body)
        {
            var result=_recommenderService.SendEmail(userId, body);    
            return CreateResponse(result);
        }
        [HttpGet("filter/{tourId:int}/{userId:int}/{rating:int}")]
        public ActionResult<PagedResult<TourDto>> FilterRecommendedTours(int tourId, int userId, int rating)
        {
            var result = _recommenderService.FilterRecommendedTours(tourId, userId,rating);
            return CreateResponse(result);
        }
    }
}
