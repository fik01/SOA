using Explorer.Blog.Core.Domain;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Execution;
using Explorer.Tours.Core.Domain.Sessions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace Explorer.API.Controllers.Execution
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/positionSimulator")]
    public class PositionSimulatorController : BaseApiController
    {
        private readonly IPositionSimulatorService _positionSimulatorService;
        private readonly HttpClient _httpClient;

        public PositionSimulatorController(IPositionSimulatorService positionSimulatorService, IHttpClientFactory httpClientFactory)
        {
            _positionSimulatorService = positionSimulatorService;

            _httpClient = httpClientFactory.CreateClient();
            _httpClient.BaseAddress = new Uri("http://localhost:8080");

        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PositionSimulatorDto>> Get(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/positionSimulator/getById?id=" + id);

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<PositionSimulatorDto>(responseBody);

                return Ok(responseObject);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }

        [HttpPost]
        public async Task<ActionResult<PositionSimulatorDto>> Create([FromBody] PositionSimulatorDto positionSimulatorDto)
        {
            try
            {

                string jsonPayload = JsonSerializer.Serialize(positionSimulatorDto);


                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");


                HttpResponseMessage response = await _httpClient.PostAsync("/positionSimulator/create", content);


                if (response.IsSuccessStatusCode)
                {

                    string responseBody = await response.Content.ReadAsStringAsync();


                    return Ok(responseBody);
                }
                else
                {

                    return StatusCode((int)response.StatusCode, "Failed to create resource on the GoLang API");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<PositionSimulatorDto>> Update([FromBody] PositionSimulatorDto positionSimulatorDto)
        {
            try
            {

                string jsonPayload = JsonSerializer.Serialize(positionSimulatorDto);


                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");


                HttpResponseMessage response = await _httpClient.PostAsync("/positionSimulator/update", content);


                if (response.IsSuccessStatusCode)
                {

                    string responseBody = await response.Content.ReadAsStringAsync();


                    return Ok(responseBody);
                }
                else
                {

                    return StatusCode((int)response.StatusCode, "Failed to update resource on the GoLang API");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("touristId/{touristId:long}")]
        public async Task<ActionResult<PositionSimulatorDto>> GetByTouristId(long touristId)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/positionSimulator/getByTouristId?touristId=" + touristId);

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<PositionSimulatorDto>(responseBody);

                return Ok(responseObject);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }
    }  
}
