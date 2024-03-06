using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Execution;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Execution
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/session")]
    public class SessionController : BaseApiController
    {
        private readonly ISessionService _sessionService;

        public SessionController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }

        [HttpGet("{id:long}")]
        public ActionResult<SessionDto> Get(int id)
        {
            var result = _sessionService.Get(id);
            return CreateResponse(result);
        }

        [HttpGet("getByTouristId/{id:long}")]
        public ActionResult<SessionDto> GetActiveByTouristId(long id)
        {
            var result = _sessionService.GetActiveByTouristId(id);
            return CreateResponse(result);
        }

        [HttpGet("getAllByTouristId/{id:long}")]
        public ActionResult<SessionDto> GetAllByTouristId(long id)
        {
            var result = _sessionService.GetAllByTouristId(id);
            return CreateResponse(result);
        }
        [HttpGet("geActiveSessiontByTouristId/{id:long}")]
        public ActionResult<SessionDto> GetActiveSessionByTouristId(long id)
        {
            var result = _sessionService.GetActiveSessionByTouristId(id);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<SessionDto> Create([FromBody] SessionDto session)
        {
            var result = _sessionService.Create(session);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<SessionDto> Update([FromBody] SessionDto session)
        {
            var result = _sessionService.Update(session);
            return CreateResponse(result);
        }

        [HttpGet("check/{id:long}")]
        public ActionResult<bool> Check(int id)
        {
            var result = _sessionService.ValidForTouristComment(id);
            return CreateResponse(result);
        }

        [HttpPut("completeKeyPoint/{sessionId:int}/{keyPointId:int}")]
        public ActionResult<SessionDto> CompleteKeyPoint(int sessionId, int keyPointId)
        {
            var result = _sessionService.AddCompletedKeyPoint(sessionId, keyPointId);
            return CreateResponse(result);
        }

        [HttpGet("getByTourAndTouristId/{tourId:long}/{touristId:long}")]
        public ActionResult<SessionDto> GetByTourAndTouristId(long tourId, long touristId)
        {
            var result = _sessionService.GetByTourAndTouristId(tourId, touristId);
            return CreateResponse(result);
        }

        [HttpGet("getSessionsByTouristId/{touristId:long}")]
        public ActionResult<SessionDto> GetPagedByTouristId(long touristId, [FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _sessionService.GetPagedByTouristId(touristId, page, pageSize);
            return CreateResponse(result);
        }
    }
}
