using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using FluentResults;

namespace Explorer.Payments.Core.UseCases
{
    public class BundleService : CrudService<BundleDto, Bundle>, IBundleService
    {

        private readonly IBundleRepository _bundleRepository;
        public BundleService(IBundleRepository repository, IMapper mapper) : base(repository, mapper)
        {
            _bundleRepository = repository;
        }

        public Result<PagedResult<BundleDto>> GetByAuthorId(int page, int pageSize, int id)
        {
            var result = _bundleRepository.GetPagedByAuthorId(id, page, pageSize);
            return MapToDto(result);
        }

    }
}
