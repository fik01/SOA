using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Public
{
    public interface IRecommenderService
    {
        Result<PagedResult<TourDto>> GetRecommendedToursByLocation(int userId, int page, int pageSize);
        Result<PagedResult<TourDto>> GetActiveToursByLocation(int userId, int page, int pageSize);
        Result<PagedResult<TourDto>> GetRecommendedToursFromFollowings(int tourId, int userId);
        Result<bool> SendEmail(int userId, string body);
        public Result<PagedResult<TourDto>> FilterRecommendedTours(int tourId, int userId, int rating);
        Result<PagedResult<TourDto>> GetRecommendedToursByLocationForTourist(int page, int pageSize, int touristId);
        Result<PagedResult<TourDto>> GetActiveToursByLocationForTourist(int page, int pageSize, int touristId);
    }
}

