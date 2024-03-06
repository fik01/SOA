using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using FluentResults;

namespace Explorer.Tours.API.Public
{
    public interface ITourKeyPointService
    {
        Result<PagedResult<TourKeyPointDto>> GetPaged(int page, int pageSize);
        Result<List<TourKeyPointDto>> GetByTourId(long tourId);
        Result<TourKeyPointDto> Get(int id);
        Result<TourKeyPointDto> Create(TourKeyPointDto tourKeyPoint);
        Result<TourKeyPointDto> Update(TourKeyPointDto tourKeyPoint);
        Result<List<TourKeyPointDto>> GetAllByPublicKeypointId(long publicId);
        Result Delete(int id);
    }
}
