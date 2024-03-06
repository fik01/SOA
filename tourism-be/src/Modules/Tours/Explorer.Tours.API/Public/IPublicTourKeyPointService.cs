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
    public interface IPublicTourKeyPointService
    {
        Result<PagedResult<PublicTourKeyPointDto>> GetPaged(int page, int pageSize);
        Result<PublicTourKeyPointDto> Get(int id);
        Result<PublicTourKeyPointDto> Create(PublicTourKeyPointDto tourKeyPoint);
        Result<PublicTourKeyPointDto> ChangeStatus(int id, String status);
        Result<List<PublicTourKeyPointDto>> GetByStatus(String status);
        Result Delete(int id);
    }
}
