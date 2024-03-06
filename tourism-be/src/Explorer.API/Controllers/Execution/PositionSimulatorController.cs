using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Execution;
using Explorer.Tours.Core.Domain.Sessions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Execution
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/positionSimulator")]
    public class PositionSimulatorController : BaseApiController
    {
        private readonly IPositionSimulatorService _positionSimulatorService;

        public PositionSimulatorController(IPositionSimulatorService positionSimulatorService)
        {
            _positionSimulatorService = positionSimulatorService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<PositionSimulatorDto> Get(int id)
        {
            var result = _positionSimulatorService.Get(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<PositionSimulatorDto> Create([FromBody] PositionSimulatorDto positionSimulatorDto)
        {
            var result = _positionSimulatorService.Create(positionSimulatorDto);
            return CreateResponse(result);
        }

        [HttpPut("{id:int}")]
        public ActionResult<PositionSimulatorDto> Update([FromBody] PositionSimulatorDto positionSimulatorDto)
        {
            var result = _positionSimulatorService.Update(positionSimulatorDto);
            return CreateResponse(result);
        }

        [HttpGet("touristId/{touristId:long}")]
        public ActionResult<PositionSimulator> GetByTouristId(long touristId)
        {
            var result = _positionSimulatorService.GetByTouristId(touristId);
            return CreateResponse(result);
        }
    }  
}
