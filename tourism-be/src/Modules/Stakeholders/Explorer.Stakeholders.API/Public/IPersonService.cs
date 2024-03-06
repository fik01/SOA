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
    public interface IPersonService
    {
        Result<List<PersonDto>> GetAuthorsAndTourists();
        Result<PersonDto> Get(int id);
        Result<PersonDto> Update(PersonDto person);
        Result<List<PersonDto>> GetAllFollowers(int id);
        Result<List<PersonDto>> GetAllFollowings(int id);
        Result<string> GetEmailByUserId(int id);
        Result<string> GetNameById(int id);
    }
}
