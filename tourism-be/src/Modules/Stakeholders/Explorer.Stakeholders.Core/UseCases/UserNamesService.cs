using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Internal;
using Explorer.Stakeholders.Core.Domain;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.UseCases
{
    public class UserNamesService :CrudService<UserNamesDto,User>, IUserNames
    {
        public UserNamesService(ICrudRepository<User> crudRepository, IMapper mapper) : base(crudRepository, mapper)
        {
        }

        public UserNamesDto GetName(long id)
        {
            User user=CrudRepository.Get(id);
            UserNamesDto userdto= new UserNamesDto();
            userdto.Id = id;
            userdto.Username= user.Username;
            return userdto;
        }
    }
}
