using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Explorer.Tours.API.Public.Administration;
using FluentResults;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;

namespace Explorer.Tours.Core.UseCases.Administration
{
    public class PublicFacilityService : CrudService<PublicFacilityDto, PublicFacility>, IPublicFacilityService
    {
        private readonly IFacilityRepository _facilityRepository;
        public PublicFacilityService(ICrudRepository<PublicFacility> crudRepository, IMapper mapper, IFacilityRepository facilityRepository) : base(crudRepository, mapper)
        {
            _facilityRepository = facilityRepository;
        }

        public Result<PublicFacilityDto> ChangeStatus(int id, string status)
        {
            PublicFacility facility = (PublicFacility)_facilityRepository.GetById(id);
            Enum.TryParse(status, out PublicFacility.PublicFacilityStatus parsedStatus);
            facility.ChangeStatus(parsedStatus);
            _facilityRepository.Update(facility);


            return CreateDto(facility);
        }

        private PublicFacilityDto CreateDto(PublicFacility facility)
        {
            return new PublicFacilityDto
            {
                Id = (int)facility.Id,
                Name = facility.Name,
                Description = facility.Description,
                Image = facility.Image,
                Latitude = facility.Latitude,
                Longitude = facility.Longitude,
                CreatorId = facility.CreatorId,
                Status = facility.Status.ToString(),
            };
        }

        public Result<List<PublicFacilityDto>> GetByStatus(string status)
        {
            List<PublicFacilityDto> facilityDtos = new List<PublicFacilityDto>();
            Enum.TryParse(status, out PublicFacility.PublicFacilityStatus parsedStatus);
            var facilities = _facilityRepository.GetByStatus(parsedStatus);
            foreach (var facility in facilities)
            {
                facilityDtos.Add(CreateDto(facility));
            }

            return facilityDtos;
        }
    }
}
