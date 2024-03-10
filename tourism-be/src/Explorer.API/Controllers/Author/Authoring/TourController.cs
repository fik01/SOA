using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Authoring;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Explorer.API.Controllers.Author.Authoring
{
    //[Authorize(Policy = "authorPolicy")]
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
        public async Task<ActionResult<List<TourDto>>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var jsonResponse = await GetToursAsync(_httpClient);
            var tourDtos = JsonConvert.DeserializeObject<List<TourDto>>(jsonResponse);
            return tourDtos;
        }

        static async Task<string> GetToursAsync(HttpClient httpClient)
        {
            using HttpResponseMessage response = await httpClient.GetAsync("getTours");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }


        [HttpPost]
        public ActionResult<TourDto> Create([FromBody] TourDto tour)
        {
            var result = _tourService.Create(tour);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<TourDto> Update([FromBody] TourDto tour)
        {
            var result = _tourService.Update(tour);
            return CreateResponse(result);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var result = _tourService.Delete(id);
            return CreateResponse(result);
        }

        [AllowAnonymous]
        [HttpGet("{id:int}")]
        public ActionResult<TourDto> Get(int id)
        {
            var result = _tourService.Get(id);
            return CreateResponse(result);
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
        public ActionResult<PagedResult<TourDto>> GetAllByAuthorId([FromQuery] int authorId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _tourService.GetPagedByAuthorId(authorId, page, pageSize);
            return CreateResponse(result);
        }
    }
}
