using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/tourProblem")]
    public class TourProblemController : BaseApiController
    {
        private readonly ITourProblemService _problemService;
        private static HttpClient _httpClient;

        public TourProblemController(ITourProblemService problemService)
        {
            _problemService = problemService;
            _httpClient = new HttpClient();
            var service = Environment.GetEnvironmentVariable("GO_TOUR_SERVICE_HOST") ?? "localhost";
            _httpClient.BaseAddress = new Uri($"http://{service}:8080");
        }

        [HttpGet("{authorId:long}")]
        public async Task<ActionResult<PagedResult<TourProblemDto>>> GetByAuthorId(long authorId)
        {
            var jsonResponse = await GetByAuthorIdAsync(_httpClient, authorId);
            var tourProblemsDtos = JsonConvert.DeserializeObject<List<TourProblemDto>>(jsonResponse);

            int total = 0;
            if(tourProblemsDtos == null)
            {
                return null;
            }
            foreach (var ex in tourProblemsDtos)
            {
                total++;
            }

            var pagedResult = new PagedResult<TourProblemDto>(tourProblemsDtos, total);

            return pagedResult;
        }


        static async Task<string> GetByAuthorIdAsync(HttpClient httpClient, long authorId)
        {
            string url = $"tourProblem/getByAuthorId?authorId={authorId}";
            using HttpResponseMessage response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
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

        [HttpGet("messages/{userId:long}")]
        public ActionResult<PagedResult<TourProblemMessageDto>> GetUnreadMessages(long userId)
        {
            var result = _problemService.GetUnreadMessages(userId);
            return CreateResponse(result);
        }
    }
}