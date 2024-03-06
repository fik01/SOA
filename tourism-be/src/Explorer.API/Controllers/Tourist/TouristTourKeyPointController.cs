using Explorer.Tours.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/tourKeyPoint")]
    public class TouristTourKeyPointController : BaseApiController
    {
        private readonly ITourKeyPointService _tourKeyPointService;

        public TouristTourKeyPointController(ITourKeyPointService tourKeyPointService)
        {
            _tourKeyPointService = tourKeyPointService;
        }
        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var result = _tourKeyPointService.Delete(id);
            return CreateResponse(result);

        }
    }
}
