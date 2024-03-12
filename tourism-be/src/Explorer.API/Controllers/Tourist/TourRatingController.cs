using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.UseCases;
using Explorer.Tours.Core.UseCases.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/tourrating")]
    public class TourRatingController : BaseApiController
    {
        private readonly ITourRatingService _ratingService;
        private readonly HttpClient _httpClient;

        public TourRatingController(ITourRatingService ratingService, IHttpClientFactory httpClientFactory)
        {
            _ratingService = ratingService;

            _httpClient = httpClientFactory.CreateClient();
            _httpClient.BaseAddress = new Uri("http://localhost:8080");
        }

        [HttpGet]
        public ActionResult<PagedResult<TourRatingDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _ratingService.GetPaged(page, pageSize);          
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<TourRatingDto>> Get(int id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/rating/getById?id=" + id);

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<TourRatingDto>(responseBody);

                return Ok(responseObject);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }

        [HttpPost]
        public async Task<ActionResult<TourRatingDto>> Create([FromBody] TourRatingDto rating)
        {
            try
            {
            
                string jsonPayload = JsonSerializer.Serialize(rating);

                
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                
                HttpResponseMessage response = await _httpClient.PostAsync("/rating/create", content);

                
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

        [HttpGet("tour/{tourId:int}")]
        public async Task<ActionResult<PagedResult<TourRatingDto>>> GetByTourId(int tourId)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/rating/getByTourId?tourId=" + tourId);
            

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<List<TourRatingDto>>(responseBody);
                var tours = new PagedResult<TourRatingDto>(responseObject,1);

                return Ok(tours);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }

        [HttpPut]
        public async Task<ActionResult<TourRatingDto>> Update([FromBody] TourRatingDto rating)
        {
            try
            {

                string jsonPayload = JsonSerializer.Serialize(rating);


                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");


                HttpResponseMessage response = await _httpClient.PostAsync("/rating/update", content);


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

        [HttpGet("getByPersonIdAndTourId/{personId:long}/{tourId:long}")]
        public async Task<ActionResult<TourRatingDto>> GetByPersonIdAndTourId(long personId, long tourId)
        {
            HttpResponseMessage response = await _httpClient.GetAsync("/getByPersonAndTourId?tourId=" + tourId + "&personId=" + personId);


            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<List<TourRatingDto>>(responseBody);
                var tours = new PagedResult<TourRatingDto>(responseObject, 1);

                return Ok(tours);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }
    }
}
