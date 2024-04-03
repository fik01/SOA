using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/tourManagement/equipment")]
    public class EquipmentController : BaseApiController
    {
        private readonly IEquipmentService _equipmentService;
        private readonly HttpClient _httpClient;

        public EquipmentController(IEquipmentService equipmentService, IHttpClientFactory httpClientFactory)
        {
            _equipmentService = equipmentService;

            _httpClient = httpClientFactory.CreateClient();
            var service = Environment.GetEnvironmentVariable("GO_TOUR_SERVICE_HOST") ?? "localhost";
            _httpClient.BaseAddress = new Uri($"http://{service}:8080");
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<PagedResult<EquipmentDto>>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/equipment/get");

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<List<EquipmentDto>>(responseBody);
                var equipment = new PagedResult<EquipmentDto>(responseObject, 0);

                return Ok(equipment);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EquipmentDto>> Get(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/equipment/getById?id="+id);

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<EquipmentDto>(responseBody);

                return Ok(responseObject);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }
    }
}
