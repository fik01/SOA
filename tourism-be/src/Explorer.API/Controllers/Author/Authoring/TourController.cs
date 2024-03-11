using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Authoring;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace Explorer.API.Controllers.Author.Authoring
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/tourManagement/tour")]
    public class TourController : BaseApiController
    {
        private readonly ITourService _tourService;

        private static HttpClient _httpClient;

        public TourController(ITourService tourService)
        {
            _tourService = tourService;
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri("http://localhost:8080"),
            };
        }

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


        [HttpPost]
        public async Task<ActionResult<TourDto>> Create([FromBody] TourDto tour)
        {
            var result = await CreateTourAsync(_httpClient, tour);
            return Ok(result);
        }

        static async Task<TourDto> CreateTourAsync(HttpClient httpClient, TourDto tourDto)
        {
            using StringContent jsonContent = new(
                System.Text.Json.JsonSerializer.Serialize(tourDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("newtour", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            // Deserialize the JSON response into TourDto
            var result = System.Text.Json.JsonSerializer.Deserialize<TourDto>(jsonResponse);

            return result;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<TourDto>> Update([FromBody] TourDto tour)
        {
            var result = await UpdateTourAsync(_httpClient, tour);
            return Ok(result);
        }

        static async Task<TourDto> UpdateTourAsync(HttpClient httpClient, TourDto tourDto)
        {
            using StringContent jsonContent = new(
                System.Text.Json.JsonSerializer.Serialize(tourDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("updateTour", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            // Deserialize the JSON response into TourDto
            var result = System.Text.Json.JsonSerializer.Deserialize<TourDto>(jsonResponse);

            return result;
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var result = _tourService.Delete(id);
            return CreateResponse(result);
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

        [HttpPut("publish/{id:int}")]
        public ActionResult<TourDto> Publish(int id, [FromBody] int authorId)
        {
            var result = _tourService.Publish(id, authorId);
            return CreateResponse(result);
        }

        [HttpPut("archive/{id:int}")]
        public ActionResult<TourDto> Archive(int id, [FromBody] int authorId)
        {
            var result = _tourService.Archive(id, authorId);
            return CreateResponse(result);
        }

        [HttpGet("author")]
        public async Task<ActionResult<PagedResult<TourDto>>> GetAllByAuthorId([FromQuery] int authorId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            var jsonResponse = await GetAllToursByAuthorIdAsync(_httpClient, authorId);
            var tourDtos = JsonConvert.DeserializeObject<List<TourDto>>(jsonResponse);

            int total = 0;
            foreach(var ex in tourDtos)
            {
                total++;
            }

            var pagedResult = new PagedResult<TourDto>(tourDtos, total);

            return pagedResult;
        }

        static async Task<string> GetAllToursByAuthorIdAsync(HttpClient httpClient, int authorId)
        {
            string url = $"getAllByAuthorId?author_id={authorId}";
            using HttpResponseMessage response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}
