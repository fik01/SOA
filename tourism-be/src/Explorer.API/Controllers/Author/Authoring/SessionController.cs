using Explorer.Tours.API.Dtos.Statistics;
using Explorer.Tours.API.Public.Execution;
using Explorer.Tours.Core.Domain.Sessions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author.Authoring
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/session")]
    public class SessionController : BaseApiController
    {
        private readonly ISessionService _sessionService;

        public SessionController(ISessionService sessionService)
        {
            _sessionService = sessionService;
        }


        [HttpGet("getAttendedStats")]
        public ActionResult<List<TourStatisticsDto>> GetAttendanceStatistics()
        {
            var result = _sessionService.GetAttendanceStatistics();
            return CreateResponse(result);
        }

        [HttpGet("getAbandonedStats")]
        public ActionResult<List<TourStatisticsDto>> GetAbandonedStatistics()
        {
            var result = _sessionService.GetAbandonedStatistics();
            return CreateResponse(result);
        }

        [HttpGet("getSessionsByStatusForTourStatistics/{tourId:int}/{status:int}")]
        public ActionResult<TourStatisticsDto> GetSessionsByStatusForTourStatistics(int tourId,SessionStatus status)
        {
            var result = _sessionService.GetSessionsByStatusForTourStatistics(tourId, (int)status);
            return CreateResponse(result);
        }

        [HttpGet("getNumberOfStartedTours/{authorId:int}")]
        public ActionResult<int> GetNumberOfStartedTours(int authorId)
        {
            var result = _sessionService.GetNumberOfStartedTours(authorId);
            return CreateResponse(result);
        }

        [HttpGet("getNumberOfCompletedTours/{authorId:int}")]
        public ActionResult<int> GetNumberOfCompletedTours(int authorId)
        {
            var result = _sessionService.GetNumberOfCompletedTours(authorId);
            return CreateResponse(result);
        }

        [HttpGet("getNumberSessionsByTour/{tourId:int}")]
        public ActionResult<TourStatisticsDto> GetNumberSessionsByTour(int tourId)
        {
            var result = _sessionService.GetNumberSessionsByTour(tourId);
            return CreateResponse(result);
        }

        [HttpGet("getPercentCompletedKeyPointOnTour/{tourId:int}/{keyPointId:int}")]
        public ActionResult<TourStatisticsDto> GetStatisticsForCompletedKeypointOnTour(int tourId, int keyPointId)
        {
            var result = _sessionService.GetStatisticsForCompletedKeypointOnTour(tourId,keyPointId);
            return CreateResponse(result);
        }

        [HttpGet("getTourCompletionPercentageStats/{authorId:int}")]
        public ActionResult<List<int>> GetTourCompletionPercentageStats(int authorId)
        {
            var result = _sessionService.GetTourCompletionPercentageStats(authorId);
            return CreateResponse(result);
        }
    }
}
