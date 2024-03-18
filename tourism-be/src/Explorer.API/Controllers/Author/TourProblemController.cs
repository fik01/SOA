using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri("http://localhost:8080"),
            };
        }

        [HttpGet("{authorId:long}")]
        public ActionResult<PagedResult<TourProblemDto>> GetByAuthorId(long authorId)
        {
            var result = _problemService.GetByAuthorId(authorId);
            _problemService.FindNames(result.Value);
            return CreateResponse(result);
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