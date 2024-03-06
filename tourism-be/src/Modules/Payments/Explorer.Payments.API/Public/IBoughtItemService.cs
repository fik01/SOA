using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Dtos.ListedTours;
using Explorer.Payments.API.Dtos.Statistics;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Public
{
    public interface IBoughtItemService
    {
        Result Create(List<BoughtItemDto> items);
        Result DeleteItem(long tourId, long userId);
        Result UpdateItem(long userId, long tourId);
        Result<List<ListedTourDto>> GetUnusedTours(long userId);
        Result<List<ListedTourDto>> GetUsedTours(long userId);
        Result<List<SoldTourStatisticsDto>> GetSoldToursStatistics();
        Result<PagedResult<ListedTourDto>> GetPagedToursByTouristId(long touristId, int page, int pageSize);
        Result<List<BoughtItemDto>> GetByTourId(long tourId);
        Result<List<BoughtItemDto>> GetAll();
    }
}
