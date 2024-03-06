using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using FluentResults;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Public
{
    public interface IBundleService
    {
        Result<BundleDto> Get(int id);
        Result<PagedResult<BundleDto>> GetPaged(int page, int pageSize);
        Result<PagedResult<BundleDto>> GetByAuthorId(int page, int pageSize, int id);
        Result<BundleDto> Create(BundleDto bundle);
        Result<BundleDto> Update(BundleDto bundle);
        Result Delete(int id);
    }
}
