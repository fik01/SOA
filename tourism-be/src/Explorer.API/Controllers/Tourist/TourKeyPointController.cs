using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.UseCases;
using Explorer.Tours.Core.UseCases.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using System.Net.Http;
using static Explorer.Tours.Core.Domain.PublicTourKeyPoints;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/tourKeyPoint")]
    public class TourKeyPointController : BaseApiController
    {
        private readonly ITourKeyPointService _tourKeyPointService;
        private readonly IPublicTourKeyPointService _publicTourKeyPointService;
        private static HttpClient _httpClient;

        public TourKeyPointController(ITourKeyPointService tourKeyPointService, IPublicTourKeyPointService publicTourKeyPointService)
        {
            _tourKeyPointService = tourKeyPointService;
            _publicTourKeyPointService = publicTourKeyPointService;
            var service = Environment.GetEnvironmentVariable("GO_TOUR_SERVICE_HOST") ?? "localhost";
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri($"http://{service}:8080"),
            };
        }

        [HttpGet]
        public ActionResult<PagedResult<TourKeyPointDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _tourKeyPointService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("tour/{tourId:int}")]
        public async Task<ActionResult<PagedResult<TourKeyPointDto>>> GetByTourId(int tourId)
        {
            var jsonResponse = await GetByTourIdAsync(_httpClient, tourId);
            var tourKeyPointDtos = JsonConvert.DeserializeObject<List<TourKeyPointDto>>(jsonResponse);

            int total = 0;
            foreach (var ex in tourKeyPointDtos)
            {
                total++;
            }

            var pagedResult = new PagedResult<TourKeyPointDto>(tourKeyPointDtos, total);

            return pagedResult;
        }

        static async Task<string> GetByTourIdAsync(HttpClient httpClient, int id)
        {
            string url = $"tourKeyPoint/getByTourId?tourId={id}";
            using HttpResponseMessage response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TourKeyPointDto>> Get(int id)
        {
            var jsonResponse = await GetAsync(_httpClient, id);
            var tourKeyPointDto = JsonConvert.DeserializeObject<TourKeyPointDto>(jsonResponse);
            return tourKeyPointDto;
        }

        static async Task<string> GetAsync(HttpClient httpClient, int id)
        {
            string url = $"tourKeyPoint/getById?id={id}";
            using HttpResponseMessage response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        [HttpGet("public")]
        public ActionResult<List<PublicTourKeyPointDto>> GetAllPublic()
        {
            var result = _publicTourKeyPointService.GetByStatus("Approved");
            return CreateResponse(result);
        }

        [HttpGet("search/{publicId:int}")]
        public ActionResult<List<TourKeyPointDto>> GetAllByPublicKeypointId(int publicId)
        {
            var result = _tourKeyPointService.GetAllByPublicKeypointId(publicId);
            return CreateResponse(result);
        }
    }
}
