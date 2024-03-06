using Explorer.BuildingBlocks.Core.UseCases;
using AutoMapper;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.API.Internal;
using FluentResults;

namespace Explorer.Stakeholders.API.Public
{
    public class InternalPersonService : BaseService<PersonDto, Person>, IInternalPersonService
    {
        public IPersonRepository _personRepository;

        public InternalPersonService(IPersonRepository personRepository, IMapper mapper) : base(mapper)
        {
            _personRepository = personRepository;
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
    }
}
