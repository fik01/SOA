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
using FluentResults;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;

namespace Explorer.Tours.Core.UseCases
{
    public class PublicTourKeyPointService : CrudService<PublicTourKeyPointDto, PublicTourKeyPoints>, IPublicTourKeyPointService
    {
        private readonly ITourKeyPointsRepository _tourKeyPointsRepository;
        public PublicTourKeyPointService(ICrudRepository<PublicTourKeyPoints> crudRepository, IMapper mapper, ITourKeyPointsRepository tourKeyPointsRepository) : base(crudRepository, mapper)
        {
            _tourKeyPointsRepository = tourKeyPointsRepository;
        }

        public Result<PublicTourKeyPointDto> ChangeStatus(int id, String status)
        {
           PublicTourKeyPoints keyPoint = (PublicTourKeyPoints)_tourKeyPointsRepository.GetById(id);
           switch (status)
           {
                case "Approved":
                    keyPoint.ChangeStatus(PublicTourKeyPoints.PublicTourKeyPointStatus.Approved);
                    break;
                case "Denied":
                    keyPoint.ChangeStatus(PublicTourKeyPoints.PublicTourKeyPointStatus.Denied);
                    break;
                default:
                    throw new ArgumentException("Invalid status", nameof(status));
                
            }
           _tourKeyPointsRepository.Update(keyPoint);


           return CreateDto(keyPoint);
        }

        private PublicTourKeyPointDto CreateDto(PublicTourKeyPoints keyPoint)
        {
            return new PublicTourKeyPointDto
            {
                Id = (int)keyPoint.Id,
                Name = keyPoint.Name,
                Description = keyPoint.Description,
                Image = keyPoint.Image,
                Latitude = keyPoint.Latitude,
                Longitude = keyPoint.Longitude,
                CreatorId = keyPoint.CreatorId,
                Status = keyPoint.Status.ToString(),
            };
        }
        public Result<List<PublicTourKeyPointDto>> GetByStatus(String status)
        {
            List<PublicTourKeyPointDto> tourKeyPointDtos = new List<PublicTourKeyPointDto>();
            Enum.TryParse(status, out PublicTourKeyPoints.PublicTourKeyPointStatus parsedStatus);
            var tourKeyPoints = _tourKeyPointsRepository.GetByStatus(parsedStatus);
            foreach (var tourKeyPoint in tourKeyPoints)
            {
                tourKeyPointDtos.Add(CreateDto(tourKeyPoint));
            }

            return tourKeyPointDtos;
        }

    }
}
