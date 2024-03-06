using Explorer.Stakeholders.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Public
{
    public interface IUserActivityService
    {
        Result<UserDto> Update(UserDto user);
        Result<UserDto> Block(UserDto user);
        Result<UserDto> Get(int id);
    }
}
