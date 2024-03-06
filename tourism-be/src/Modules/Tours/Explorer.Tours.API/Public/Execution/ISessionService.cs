using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Dtos.Statistics;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Public.Execution
{
    public interface ISessionService
    {
        Result<SessionDto> Create(SessionDto session);
        Result<SessionDto> Update(SessionDto session);
        Result<SessionDto> Get(long id);
        Result<SessionDto> GetActiveByTouristId(long id);
        Result<List<SessionDto>> GetAllByTouristId(long id);
        Result<SessionDto> GetActiveSessionByTouristId(long id);
        Result<bool> ValidForTouristComment(long id);
        Result<SessionDto> AddCompletedKeyPoint(int sessionId, int keyPointId);
        Result<SessionDto> GetByTourAndTouristId(long tourId, long touristId);
        Result<List<TourStatisticsDto>> GetAttendanceStatistics();
        Result<List<TourStatisticsDto>> GetAbandonedStatistics();
        Result<TourStatisticsDto> GetSessionsByStatusForTourStatistics(int tourId, int sessionStatus);
        Result<PagedResult<SessionDto>> GetPagedByTouristId(long touristId, int page, int pageSize);
        Result<int> GetNumberOfStartedTours(int authorId);
        Result<int> GetNumberOfCompletedTours(int authorId);
        Result<TourStatisticsDto> GetNumberSessionsByTour(int tourId);
        Result<TourStatisticsDto> GetStatisticsForCompletedKeypointOnTour(int tourId, int keyPointId);
        Result<List<int>> GetTourCompletionPercentageStats(int authorId);
    }
}
