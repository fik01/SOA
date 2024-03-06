using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Internal;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.UseCases
{
    public class InternalCommentService : BaseService<PersonDto, Person>, IInternalCommentService
    {

        public IInternalCommentRepository _internalCommentRepository;

        public InternalCommentService(IInternalCommentRepository internalCommetnRepository, IMapper mapper) : base(mapper)
        {
            _internalCommentRepository = internalCommetnRepository;
        }

        public PersonDto GetByUserId(int id)
        {
            var result = _internalCommentRepository.GetPersonByUserId(id);
            return MapToDto(result);
        }
    }
}
