using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Core.Domain;
using FluentResults;

namespace Explorer.Stakeholders.Core.UseCases
{
    public class UserInformationService : CrudService<UserInformationDto, User>, IUserInformationService
    {
        public UserInformationService(ICrudRepository<User> userRepository, IMapper mapper) : base(userRepository, mapper)
        { }

        public Result<PagedResult<UserInformationDto>> Join(Result<PagedResult<UserInformationDto>> users, Result<PagedResult<UserInformationDto>> persons)
        {
            foreach (var user in users.Value.Results) 
            {
                foreach (var person in persons.Value.Results)
                {
                    if (user.UserId == person.UserId)
                    {
                        user.Email=person.Email;  
                    }
                }
            }
            users.Value.Results.RemoveAll(u => u.Role.Equals("Administrator"));
            return users;
        }
    }
}
