using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/applicationrating")]
    public class ApplicationRatingController : BaseApiController
    {
        private readonly IApplicationRatingService _applicationRatingService;

        public ApplicationRatingController(IApplicationRatingService applicationRatingService)
        {
            _applicationRatingService = applicationRatingService;
        }

        [HttpGet]
        public ActionResult<PagedResult<ApplicationRatingDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _applicationRatingService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<ApplicationRatingDto> Create([FromBody] ApplicationRatingDto applicationRatingDto)
        {
            var result = _applicationRatingService.Create(applicationRatingDto);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ApplicationRatingDto> Update([FromBody] ApplicationRatingDto applicationRatingDto)
        {
            var result = _applicationRatingService.Update(applicationRatingDto);
            return CreateResponse(result);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            var result = _applicationRatingService.Delete(id);
            return CreateResponse(result);
        }
    }
}
