using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.Domain.Tours;
using Explorer.Tours.Core.UseCases;
using Explorer.Tours.Core.UseCases.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/tourKeyPoint")]
    public class TourKeyPointController : BaseApiController
    {
        private readonly ITourKeyPointService _tourKeyPointService;
        private readonly IPublicTourKeyPointService _publicTourKeyPointService;
        private static HttpClient _httpClient;

        public TourKeyPointController(ITourKeyPointService tourKeyPointService, IPublicTourKeyPointService publicTourKeyPointService)
        {
            _tourKeyPointService = tourKeyPointService;
            _publicTourKeyPointService = publicTourKeyPointService;
            _httpClient = new HttpClient()
            {
                BaseAddress = new Uri("http://localhost:8080"),
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

        [HttpPost]
        public async Task<ActionResult<TourKeyPointDto>> Create([FromBody] TourKeyPointDto tourKeyPoint)
        {
            var result = await CreateTourKEyPointAsync(_httpClient, tourKeyPoint);
            return Ok(result);
        }


        static async Task<TourKeyPointDto> CreateTourKEyPointAsync(HttpClient httpClient, TourKeyPointDto tourKeyPointDto)
        {
            using StringContent jsonContent = new(
                System.Text.Json.JsonSerializer.Serialize(tourKeyPointDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("tourKeyPoint/create", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            // Deserialize the JSON response into TourDto
            var result = System.Text.Json.JsonSerializer.Deserialize<TourKeyPointDto>(jsonResponse);

            return result;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<TourKeyPointDto>> Update([FromBody] TourKeyPointDto tourKeyPoint)
        {
            var result = await UpdateTourKeyPointAsync(_httpClient, tourKeyPoint);
            return Ok(result);
        }


        static async Task<TourKeyPointDto> UpdateTourKeyPointAsync(HttpClient httpClient, TourKeyPointDto tourKeyPointDto)
        {
            using StringContent jsonContent = new(
                System.Text.Json.JsonSerializer.Serialize(tourKeyPointDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("tourKeyPoint/update", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            // Deserialize the JSON response into TourDto
            var result = System.Text.Json.JsonSerializer.Deserialize<TourKeyPointDto>(jsonResponse);

            return result;
        }


        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await DeleteTourAsync(_httpClient, id);
            return result ? Ok() : NotFound();

        }

        static async Task<bool> DeleteTourAsync(HttpClient httpClient, int id)
        {
            using HttpResponseMessage response = await httpClient.DeleteAsync($"tourKeyPoint/delete?tourKeyPointId={id}");

            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                return false;
            }

            response.EnsureSuccessStatusCode();
            return false; // This line should not be reached, added for completeness
        }



        [HttpGet("public")]
        public ActionResult<PagedResult<PublicTourKeyPointDto>> GetAllPublic([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _publicTourKeyPointService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpPost("public")]
        public ActionResult<PublicTourKeyPointDto> CreatePublic([FromBody] PublicTourKeyPointDto tourKeyPoint)
        {
            var result = _publicTourKeyPointService.Create(tourKeyPoint);
            return CreateResponse(result);
        }

        [HttpPut("public/{tourId}/{status}")]
        public ActionResult<PublicTourKeyPointDto> ChangeStatus(int tourId, String status)
        {
            var result = _publicTourKeyPointService.ChangeStatus(tourId, status);
            return CreateResponse(result);
        }

        [HttpGet("public/{status}")]
        public ActionResult<PagedResult<PublicTourKeyPointDto>> GetByStatus(String status)
        {
            var result = _publicTourKeyPointService.GetByStatus(status);
            return CreateResponse(result);
        }

    }
}
