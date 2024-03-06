using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.Core.Domain.Tours;
using FluentResults;

namespace Explorer.Tours.Core.UseCases
{
    public class TourKeyPointService : CrudService<TourKeyPointDto, TourKeyPoint>, ITourKeyPointService
    {
        private readonly ITourKeyPointsRepository _tourKeyPointsRepository;

        public TourKeyPointService(ICrudRepository<TourKeyPoint> repository, IMapper mapper, ITourKeyPointsRepository tourKeyPointsRepository) : base(repository, mapper)
        {
            _tourKeyPointsRepository = tourKeyPointsRepository;
        }

        public Result<List<TourKeyPointDto>> GetAllByPublicKeypointId(long publicId)
        {
            List<TourKeyPointDto> tourKeyPointDtos = new List<TourKeyPointDto>();
            var tourKeyPoints = _tourKeyPointsRepository.GetAllByPublicId(publicId);
            foreach (var tourKeyPoint in tourKeyPoints)
            {
                TourKeyPointDto tourKeyPointDto = new TourKeyPointDto
                {
                    Id = (int)tourKeyPoint.Id,
                    Name = tourKeyPoint.Name,
                    Description = tourKeyPoint.Description,
                    Image = tourKeyPoint.Image,
                    Latitude = tourKeyPoint.Latitude,
                    Longitude = tourKeyPoint.Longitude,
                    TourId = tourKeyPoint.TourId,
                    PositionInTour = tourKeyPoint.PositionInTour,
                    PublicPointId = tourKeyPoint.PublicPointId
                };
                tourKeyPointDtos.Add(tourKeyPointDto);
            }

            return tourKeyPointDtos;
        }

        public Result<List<TourKeyPointDto>> GetByTourId(long tourId)
        {
            List<TourKeyPointDto> tourKeyPointDtos = new List<TourKeyPointDto>();
           var tourKeyPoints = _tourKeyPointsRepository.GetByTourId(tourId);
           foreach (var tourKeyPoint in tourKeyPoints)
           {
               TourKeyPointDto tourKeyPointDto = new TourKeyPointDto
               {
                   Id = (int)tourKeyPoint.Id,
                   Name = tourKeyPoint.Name,
                   Description = tourKeyPoint.Description,
                   Image = tourKeyPoint.Image,
                   Latitude = tourKeyPoint.Latitude,
                   Longitude = tourKeyPoint.Longitude,
                   TourId = tourKeyPoint.TourId
               };
                tourKeyPointDtos.Add(tourKeyPointDto);
           }

           return tourKeyPointDtos;
        }

    }
}
