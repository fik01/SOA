using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Internal;
using Explorer.Encounters.API.Public;
using Explorer.Encounters.Core.Domain;
using Explorer.Encounters.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Core.UseCases
{
    public class UserXPService : CrudService<UserExperienceDto, UserExperience>, IUserXP
    {
        private readonly IUserExperienceRepository _userExperienceRepository;
        public UserXPService(ICrudRepository<UserExperience> crudRepository,IUserExperienceRepository userExperienceRepository, IMapper mapper) : base(crudRepository, mapper)
        {
            _userExperienceRepository = userExperienceRepository;
        }

        public UserExperienceDto GetXP(long Userid)
        {
            var userExperience= _userExperienceRepository.GetByUserId(Userid);
            UserExperienceDto dto= new UserExperienceDto();
            dto.UserId = Userid;
            dto.XP = userExperience.XP;
            dto.Id = (int)userExperience.Id;
            dto.Level=userExperience.Level;
            return dto;
        }
        public UserExperienceDto Create(UserExperienceDto userExperience)
        {
            return base.MapToDto(_userExperienceRepository.Create(base.MapToDomain(userExperience)));
        }
    }
}
