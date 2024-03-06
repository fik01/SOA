using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.UseCases.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Administrator.Administration
{

    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administration/facilities")]
    public class FacilityController : BaseApiController
    {
        private readonly IFacilityService _facilityService;
        private readonly IPublicFacilityService _publicFacilityService;

        public FacilityController(IFacilityService facilityService, IPublicFacilityService publicFacilityService)
        {
            _facilityService = facilityService;
            _publicFacilityService = publicFacilityService;
        }

        [HttpGet]
        public ActionResult<PagedResult<FacilityDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _facilityService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<FacilityDto> Get(int id)
        {
            var result = _facilityService.Get(id);
            return CreateResponse(result);
        }

        [HttpGet("public")]
        public ActionResult<PagedResult<PublicFacilityDto>> GetAllPublic([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _publicFacilityService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpPut("public/{facilityId}/{status}")]
        public ActionResult<PublicFacilityDto> ChangeStatus(int facilityId, string status)
        {
            var result = _publicFacilityService.ChangeStatus(facilityId, status);
            return CreateResponse(result);
        }

        [HttpGet("public/{status}")]
        public ActionResult<PagedResult<PublicFacilityDto>> GetByStatus(string status)
        {
            var result = _publicFacilityService.GetByStatus(status);
            return CreateResponse(result);
        }
    }
}

