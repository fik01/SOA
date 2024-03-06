using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Public
{
    public interface IUserNewsService
    {
        
        Result<UserNewsDto> Get(int id);
        Result<PagedResult<UserNewsDto>> GetPaged(int page, int pageSize);
        Result<UserNewsDto> Update(UserNewsDto userNews);
        Result<UserNewsDto> GetByTouristId(int touristId);
        Result<UserNewsDto> Create(UserNewsDto userNews);
    }
}
