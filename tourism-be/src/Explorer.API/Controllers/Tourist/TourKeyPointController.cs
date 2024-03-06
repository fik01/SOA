using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.UseCases;
using Explorer.Tours.Core.UseCases.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using static Explorer.Tours.Core.Domain.PublicTourKeyPoints;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/tourKeyPoint")]
    public class TourKeyPointController : BaseApiController
    {
        private readonly ITourKeyPointService _tourKeyPointService;
        private readonly IPublicTourKeyPointService _publicTourKeyPointService;

        public TourKeyPointController(ITourKeyPointService tourKeyPointService, IPublicTourKeyPointService publicTourKeyPointService)
        {
            _tourKeyPointService = tourKeyPointService;
            _publicTourKeyPointService = publicTourKeyPointService;
        }

        [HttpGet]
        public ActionResult<PagedResult<TourKeyPointDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _tourKeyPointService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("tour/{tourId:int}")]
        public ActionResult<PagedResult<TourKeyPointDto>> GetByTourId(int tourId)
        {
            var result = _tourKeyPointService.GetByTourId(tourId);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<TourKeyPointDto> Get(int id)
        {
            var result = _tourKeyPointService.Get(id);
            return CreateResponse(result);
        }

        [HttpGet("public")]
        public ActionResult<List<PublicTourKeyPointDto>> GetAllPublic()
        {
            var result = _publicTourKeyPointService.GetByStatus("Approved");
            return CreateResponse(result);
        }

        [HttpGet("search/{publicId:int}")]
        public ActionResult<List<TourKeyPointDto>> GetAllByPublicKeypointId(int publicId)
        {
            var result = _tourKeyPointService.GetAllByPublicKeypointId(publicId);
            return CreateResponse(result);
        }
    }
}
