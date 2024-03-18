 using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace Explorer.API.Controllers.Administrator.Administration
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administration/equipment")]
    public class EquipmentController : BaseApiController
    {
        private readonly IEquipmentService _equipmentService;
        private readonly HttpClient _httpClient;

        public EquipmentController(IEquipmentService equipmentService, IHttpClientFactory httpClientFactory)
        {
            _equipmentService = equipmentService;

            _httpClient = httpClientFactory.CreateClient();
            _httpClient.BaseAddress = new Uri("http://localhost:8080");
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<EquipmentDto>>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/equipment/get");

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<List<EquipmentDto>>(responseBody);
                var equipment = new PagedResult<EquipmentDto>(responseObject, 1);

                return Ok(equipment);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }

        [HttpPost]
        public async Task<ActionResult<EquipmentDto>> Create([FromBody] EquipmentDto equipment)
        {
            try
            {

                string jsonPayload = JsonSerializer.Serialize(equipment);


                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");


                HttpResponseMessage response = await _httpClient.PostAsync("/equipment/create", content);


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
        public async Task<ActionResult<EquipmentDto>> Update([FromBody] EquipmentDto equipment)
        {
            try
            {
                string jsonPayload = JsonSerializer.Serialize(equipment);


                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");


                HttpResponseMessage response = await _httpClient.PostAsync("/equipment/update", content);


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

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/equipment/deleteById?id="+id);

            if (response.IsSuccessStatusCode)
            { 
                return Ok(response);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }
    }
}
