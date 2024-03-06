using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Dtos.Statistics;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.Core.Domain.ServiceInterfaces;
using Explorer.Tours.Core.UseCases.Authoring;
using FluentResults;


namespace Explorer.Tours.Core.UseCases
{
    public class TourRatingService : CrudService<TourRatingDto, TourRating>, ITourRatingService
    {
        private readonly ITourRatingRepository _tourRatingRepository;
        private readonly ITourStatisticsDomainService _tourStatisticsDomainService;
        public TourRatingService(ICrudRepository<TourRating> repository, IMapper mapper, ITourRatingRepository tourRatingRepository, ITourStatisticsDomainService tourStatisticsDomainService) : base(repository, mapper)
        { 
            _tourRatingRepository = tourRatingRepository;
            _tourStatisticsDomainService = tourStatisticsDomainService;
        }

        public Result<List<TourRatingDto>> GetByTourId(int tourId)
        {
            List<TourRatingDto> tourRatingsDtos = new List<TourRatingDto>();
            var tourRatings = _tourRatingRepository.GetByTourId(tourId);

            foreach (var tourRaing in tourRatings)
            {
                TourRatingDto tourRatingDto = new TourRatingDto
                {
                    Id = (int)tourRaing.Id,
                    PersonId = (int)tourRaing.PersonId,
                    TourId = (int)tourRaing.TourId,
                    Mark = (int)tourRaing.Mark,
                    Comment = tourRaing.Comment,
                    DateOfVisit = tourRaing.DateOfVisit,
                    DateOfCommenting = tourRaing.DateOfCommenting,
                    Images = tourRaing.Images
                };
                tourRatingsDtos.Add(tourRatingDto);
            }

            return tourRatingsDtos;
        }

        public Result<List<TourStatisticsDto>> GetBestRatedStatistics()
        {
            var ratings = _tourRatingRepository.GetAll();
            var domainStatistics = _tourStatisticsDomainService.CalculateBestRatedStatisticts(ratings);
            var bestRatedToursStats = new List<TourStatisticsDto>();

            foreach (var stat in domainStatistics)
            {
                TourStatisticsDto statDto = new TourStatisticsDto();
                statDto.TourId = stat.TourId;
                statDto.NumberOfStats = stat.NumberOfStats;
                bestRatedToursStats.Add(statDto);
            }

            return bestRatedToursStats;
        }

        public Result<TourRatingDto> GetByPersonIdAndTourId(long personId, long tourId)
        {
            try
            {
                var rating = _tourRatingRepository.GetByPersonIdAndTourId(personId, tourId);
                return MapToDto(rating);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }
    }
}
