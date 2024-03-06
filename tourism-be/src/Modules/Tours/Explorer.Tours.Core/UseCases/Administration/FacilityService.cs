using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.Domain;

namespace Explorer.Tours.Core.UseCases.Administration
{
    public class FacilityService : CrudService<FacilityDto, Facility>, IFacilityService
    {
        public FacilityService(ICrudRepository<Facility> crudRepository, IMapper mapper) : base(crudRepository, mapper) { }
    }
}
