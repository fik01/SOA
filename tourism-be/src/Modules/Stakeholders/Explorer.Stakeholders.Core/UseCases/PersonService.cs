using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.UseCases
{
    public class PersonService : BaseService<PersonDto, Person>, IPersonService
    {
        private readonly IPersonRepository _personRepository;
        private readonly IUserRepository _userRepository;
        public PersonService(IPersonRepository personRepository, IUserRepository userRepository, IMapper mapper) : base(mapper)
        {
            _personRepository = personRepository;
            _userRepository = userRepository;
        }

        public Result<PersonDto> Get(int id)
        {
            try
            {
                var result = _personRepository.Get(id);
                return MapToDto(result);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<List<PersonDto>> GetAllFollowers(int id)
        {
            return MapToDto(_personRepository.GetAllFollowers(id));
        }

        public Result<List<PersonDto>> GetAllFollowings(int id)
        {
            return MapToDto(_personRepository.GetAllFollowings(id));
        }

        public Result<List<PersonDto>> GetAuthorsAndTourists()
        {
            var authorsAndTourists = _personRepository.GetAuthorsAndTourists();
            List<PersonDto> result = new List<PersonDto>();

            for (int i = 0; i < authorsAndTourists.Count; i++)
            {
                result.Add(new PersonDto
                {
                    Id = authorsAndTourists[i].Id,
                    UserId = authorsAndTourists[i].UserId,
                    Name = authorsAndTourists[i].Name,
                    Surname = authorsAndTourists[i].Surname,
                    Email = authorsAndTourists[i].Email,
                    ProfilePic = authorsAndTourists[i].ProfilePic,
                    Biography = authorsAndTourists[i].Biography,
                    Motto = authorsAndTourists[i].Motto,
                    Role = _userRepository.Get(authorsAndTourists[i].UserId).Role.ToString().ToLower()
                });   
            }
            return result;
        }

        public Result<string> GetEmailByUserId(int id)
        {
            var person= _personRepository.GetByUserId(id);
            return person.Email.ToResult();
        }

        public Result<string> GetNameById(int id)
        {
            var name=_personRepository.GetNameById(id);
            return name.ToResult();
        }

        public Result<PersonDto> Update(PersonDto person)
        {
            try
            {
                var result = _personRepository.Update(MapToDomain(person));
                return MapToDto(result);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }
    }
}
