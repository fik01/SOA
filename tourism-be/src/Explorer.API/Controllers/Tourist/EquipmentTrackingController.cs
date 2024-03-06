using Explorer.Blog.API.Dtos;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.Infrastructure.Authentication;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/equipmentTracking")]
    public class EquipmentTrackingController : BaseApiController
    {
        private readonly IEquipmentTrackingService _equipmentTrackingService;
        private readonly IEquipmentService _equipmentService;
        public EquipmentTrackingController(IEquipmentTrackingService equipmentTrackingService, IEquipmentService equipmentService) 
        {
            _equipmentTrackingService = equipmentTrackingService;
            _equipmentService = equipmentService;
        }

        [HttpGet("allEquipment")]
        public ActionResult<PagedResult<EquipmentDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _equipmentService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("myEquipment")]
        public ActionResult<EquipmentTrackingDto> GetByTouristId()
        {
            long touristId = User.PersonId();
            var result = _equipmentTrackingService.GetByTouristId(touristId);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<EquipmentTrackingDto> Update(EquipmentTrackingDto dto)
        {
            var result = _equipmentTrackingService.Update(dto);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<EquipmentTrackingDto> Create([FromBody] EquipmentTrackingDto dto)
        {
            dto.TouristId = User.PersonId();
            var result = _equipmentTrackingService.Create(dto);
            return CreateResponse(result);
        }
    } 
}
