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
    public interface IUserInformationService
    {
        Result<PagedResult<UserInformationDto>> GetPaged(int page, int pageSize);
        Result<PagedResult<UserInformationDto>> Join(Result<PagedResult<UserInformationDto>> users, Result<PagedResult<UserInformationDto>> persons);

    }
}
