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
    public interface IApplicationRatingService
    {
        Result<PagedResult<ApplicationRatingDto>> GetPaged(int page, int pageSize);
        Result<ApplicationRatingDto> Create(ApplicationRatingDto applicationRating);
        Result<ApplicationRatingDto> Update(ApplicationRatingDto applicationRating);
        Result Delete(int id);
        Result<ApplicationRatingDto> Get(int id);
    }
}
