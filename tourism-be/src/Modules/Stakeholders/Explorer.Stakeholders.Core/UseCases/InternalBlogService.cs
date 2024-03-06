using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Internal;
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
    public class InternalBlogService : BaseService<UserDto, User>, IInternalBlogService
    {
        public IInternalBlogRepository _internalBlogRepository;


        public InternalBlogService(IInternalBlogRepository internalBlogRepository, IMapper mapper) : base(mapper)
        {
            _internalBlogRepository = internalBlogRepository;
        }

        public UserDto GetByUserId(long id)
        {
            var result=_internalBlogRepository.GetByUserId(id);
            return MapToDto(result);
        }
    }
}
