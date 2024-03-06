using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Internal
{
    public interface IInternalTourService
    {
        Result<TourDto> Get(int id);
        Result<PagedResult<TourDto>> GetPagedByIds(List<int> ids, int page, int pageSize);
        Result<PagedResult<TourDto>> GetAllPagedByAuthorId(int authorId);
    }
}
