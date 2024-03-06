using AutoMapper;
using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Core.Domain;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.UseCases
{
    public class UserActivityService : CrudService<UserDto, User>, IUserActivityService
    {
        public UserActivityService(ICrudRepository<User> userRepository, IMapper mapper) : base(userRepository, mapper)
        { }

        public Result<UserDto> Block(UserDto user)
        {
            user.IsActive = false;
            return user.ToResult();
        }
    }
}
