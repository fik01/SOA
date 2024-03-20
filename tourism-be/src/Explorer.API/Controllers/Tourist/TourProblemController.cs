using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Infrastructure.Authentication;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.Domain.Tours;
using Explorer.Tours.Core.UseCases;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/tourProblem")]
    public class TourProblemController : BaseApiController
    {
        private readonly ITourProblemService _problemService;
        private static HttpClient _httpClient;

        public TourProblemController(ITourProblemService problemService)
        {
            _problemService = problemService;
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri("http://localhost:8080"),
            };
        }

        [HttpPost]
        public async Task<ActionResult<TourProblemDto>> Create([FromBody] TourProblemDto tourProblem)
        {
            var result = await CreateTourProblemAsync(_httpClient, tourProblem);
            return Ok(result);
        }


        static async Task<TourProblemDto> CreateTourProblemAsync(HttpClient httpClient, TourProblemDto tourProblemDto)
        {
            using StringContent jsonContent = new(
                System.Text.Json.JsonSerializer.Serialize(tourProblemDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("tourProblem/create", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            // Deserialize the JSON response into TourDto
            var result = System.Text.Json.JsonSerializer.Deserialize<TourProblemDto>(jsonResponse);

            return result;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<TourProblemDto>> Update([FromBody] TourProblemDto tourProblem)
        {
            var result = await UpdateTourProblemAsync(_httpClient, tourProblem);
            return Ok(result);
        }

        static async Task<TourProblemDto> UpdateTourProblemAsync(HttpClient httpClient, TourProblemDto tourProblemDto)
        {
            using StringContent jsonContent = new(
                System.Text.Json.JsonSerializer.Serialize(tourProblemDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("tourProblem/update", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            // Deserialize the JSON response into TourDto
            var result = System.Text.Json.JsonSerializer.Deserialize<TourProblemDto>(jsonResponse);

            return result;
        }

        [HttpGet("{touristId:long}")]
        public async Task<ActionResult<PagedResult<TourProblemDto>>> GetByTouristId(long touristId)
        {
            var jsonResponse = await GetAllToursByAuthorIdAsync(_httpClient, touristId);
            var tourProblemsDtos = JsonConvert.DeserializeObject<List<TourProblemDto>>(jsonResponse);

            int total = 0;
            foreach (var ex in tourProblemsDtos)
            {
                total++;
            }

            var pagedResult = new PagedResult<TourProblemDto>(tourProblemsDtos, total);

            return pagedResult;
        }

        static async Task<string> GetAllToursByAuthorIdAsync(HttpClient httpClient, long touristId)
        {
            string url = $"tourProblem/getByTouristId?touristId={touristId}";
            using HttpResponseMessage response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        [HttpGet("messages/{userId:long}")]
        public ActionResult<PagedResult<TourProblemMessageDto>> GetUnreadMessages(long userId)
        {
            var result = _problemService.GetUnreadMessages(userId);
            return CreateResponse(result);
        }
    }
}