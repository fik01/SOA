using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Dtos.TouristTour;
using Explorer.Tours.API.Public.Authoring;
using Explorer.Tours.API.Public.TouristTour;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/touristTour")]
    public class TouristTourController : BaseApiController
    {

        private readonly ITourService _tourService;

        public TouristTourController(ITourService tourService)
        {
            _tourService = tourService;
        }


        [HttpPost]
        public ActionResult<TourDto> Create([FromBody] TourDto tour)
        {
            var result = _tourService.Create(tour);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<TouristTourDto> Update([FromBody] TourDto tour)
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

        [HttpGet("{id:int}")]
        public ActionResult<TourDto> Get(int id)
        {
            var result = _tourService.Get(id);
            return CreateResponse(result);
        }

        [HttpGet("tourist")]
        public ActionResult<PagedResult<TourDto>> GetAllByAuthorId([FromQuery] int authorId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _tourService.GetPagedByAuthorId(authorId, page, pageSize);
            return CreateResponse(result);
        }
    }
}
