using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Internal;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Internal;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Authoring;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.Core.Domain.Tours;
using FluentResults;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.SignalR;
using System.Dynamic;
using System.Linq;
using System.Xml.Linq;

namespace Explorer.Tours.Core.UseCases.Authoring
{
    public class TourService : CrudService<TourDto, Tour>, ITourService, IInternalTourService
    {
        private readonly ITourRepository _tourRepository;
        private readonly ITourKeyPointService _keyPointService;
        private readonly IInternalBoughtItemService _internalBoughtItemService;
        private readonly IInternalPersonService _internalPersonService;

        public TourService(ITourRepository repository, IMapper mapper, ITourKeyPointService tourKeyPointService,
            IInternalBoughtItemService internalBoughtItemService,
            IInternalPersonService internalPersonService) : base(repository, mapper)
        {
            _tourRepository = repository;
            _keyPointService = tourKeyPointService;
            _internalBoughtItemService = internalBoughtItemService;
            _internalPersonService = internalPersonService;
        }

        public Result<TourDto> Archive(int id, int userId)
        {
            try
            {
                var tour = _tourRepository.Get(id);
                tour.Archive(userId);
                _tourRepository.SaveChanges();
                return MapToDto(tour);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
            catch (UnauthorizedAccessException e)
            {
                return Result.Fail(FailureCode.Forbidden).WithError(e.Message);
            }
        }

        public Result<TourDto> Publish(int id, int userId)
        {
            try
            {
                var tour = _tourRepository.Get(id);
                tour.Publish(userId);
                _tourRepository.SaveChanges();
                return MapToDto(tour);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
            catch (UnauthorizedAccessException e)
            {
                return Result.Fail(FailureCode.Forbidden).WithError(e.Message);
            }
        }

        public Result<PagedResult<TourDto>> GetPagedByAuthorId(int authorId, int page, int pageSize)
        {
            var result = _tourRepository.GetPagedByAuthorId(authorId, page, pageSize);
            return MapToDto(result);
        }

        public Result<TourDto> CreateCampaign(List<TourDto> tours, string name, string description, int touristId)
        {
            if (tours.Count < 2)
            {
                throw new ArgumentException("In order to create campaign, atleast 2 Tours have to be picked.");
            }

            int difficulty = 0;
            List<string> tags = new List<string>();
            TourStatus status = TourStatus.Draft;
            double price = 0;
            int[] equipment = { };
            double distanceInKm = 0;
            DateTime? archivedDate = null;
            DateTime? publishedDate = null;
            List<TourDuration> durations = new List<TourDuration>();

            int counter = 0;

            foreach (var tour in tours)
            {
                distanceInKm += tour.DistanceInKm;
                difficulty += tour.Difficulty;
                tags = CombineCampaignTags(tags, tour.Tags);
                equipment = CombineCampaignEquipment(equipment, tour.Equipment);
                counter++;
            }

            TourDifficulty difficultyTemp = GetCampaignDifficulty(difficulty, counter);

            Tour campaign = new Tour(name, description, difficultyTemp, tags, status, price, touristId, equipment,
                distanceInKm, archivedDate, publishedDate, durations);

            var createdCampaign = Create(MapToDto(campaign));

            CreateDuplicateKeypoints(tours, createdCampaign.Value.Id);
            CreateBoughtItemForCampaign(touristId, createdCampaign.Value.Id);

            return MapToDto(campaign);
        }

        public void CreateBoughtItemForCampaign(int touristId, int campaignId)
        {
            BoughtItemDto boughtItemDto = new BoughtItemDto();
            boughtItemDto.UserId = touristId;
            boughtItemDto.TourId = campaignId;
            boughtItemDto.IsUsed = false;

            _internalBoughtItemService.CreateBoughtItem(boughtItemDto);
        }

        public void CreateDuplicateKeypoints(List<TourDto> tours, int campaignId)
        {
            List<TourKeyPointDto> keypoints = new List<TourKeyPointDto>();
            int positionInCampaign = 1;
            foreach (var tour in tours)
            {
                keypoints = _keyPointService.GetByTourId(tour.Id).Value;
                keypoints = keypoints.OrderBy(kp => kp.PositionInTour).ToList();
                foreach (var keypoint in keypoints)
                {
                    keypoint.PositionInTour = positionInCampaign;
                    keypoint.TourId = campaignId;
                    keypoint.Id = 0;
                    _keyPointService.Create(keypoint);
                    positionInCampaign++;
                }
            }
        }

        public int CalculateCampaignDifficulty(int difficultySum, int counter)
        {
            return difficultySum / counter;
        }

        public List<string> CombineCampaignTags(List<string> campaignTags, List<string> tourTags)
        {
            foreach (var tag in tourTags)
            {
                campaignTags.Add(tag);
            }

            return campaignTags;
        }

        public TourDifficulty GetCampaignDifficulty(int difficulty, int counter)
        {
            difficulty = CalculateCampaignDifficulty(difficulty, counter);

            if (difficulty == 0)
            {
                return TourDifficulty.Beginner;
            }
            else if (difficulty == 1)
            {
                return TourDifficulty.Intermediate;
            }
            else if (difficulty == 2)
            {
                return TourDifficulty.Advanced;
            }
            else
            {
                return TourDifficulty.Pro;
            }
        }

        public int[] CombineCampaignEquipment(int[] campaignEquipment, int[] tourEquipment)
        {
            List<int> campaignEquipmentList = new List<int>(campaignEquipment);

            foreach (var equipmentId in tourEquipment)
            {
                if (!campaignEquipmentList.Contains(equipmentId))
                {
                    campaignEquipmentList.Add(equipmentId);
                }
            }

            return campaignEquipmentList.ToArray();
        }


        public Result<PagedResult<TourDto>> GetPagedForSearch(string name, string[] tags, int page, int pageSize)
        {
            var tours = _tourRepository.GetPaged(page, pageSize);
            PagedResult<TourDto> filteredTours = new PagedResult<TourDto>(new List<TourDto>(), 0);

            if (tags[0].Contains(","))
            {
                tags = tags[0].Split(",");
            }

            filteredTours.Results.AddRange(
                tours.Results
                    .Where(tour => (tour.Name.ToLower().Contains(name.ToLower()) || name.Equals("empty")) &&
                                   tags.All(tag => tour.Tags.Any(tourTag =>
                                       tourTag.ToLower() == tag.ToLower() || tag == "empty")))
                    .Select(MapToDto)
            );

            return filteredTours;
        }

        public Result<PagedResult<TourDto>> GetPagedForSearchByLocation(int page, int pageSize, int touristId)
        {
            double radius = 40000;
            var person = _internalPersonService.Get(touristId);
            var tours = _tourRepository.GetPaged(page, pageSize);
            var publishedTours = tours.Results.Where(tour => tour.Status == Domain.Tours.TourStatus.Published).ToList();
            var resultTours = new PagedResult<TourDto>(new List<TourDto>(), 0);

            if (person.Value.Latitude == null && person.Value.Longitude == null)
            {
                foreach (Tour tour in publishedTours)
                {
                    resultTours.Results.Add(MapToDto(tour));
                }

                return resultTours;
            }

            PagedResult<TourDto> filteredTours = new PagedResult<TourDto>(new List<TourDto>(), 0);
            foreach (var tour in tours.Results)
            {
                if (tour.Status == TourStatus.Published && CheckIfAnyKeyPointInRange(tour.KeyPoints,
                        person.Value.Latitude, person.Value.Longitude, radius))
                {
                    filteredTours.Results.Add(MapToDto(tour));
                }
            }

            return filteredTours;
        }

        public bool CheckIfAnyKeyPointInRange(List<TourKeyPoint> keyPoints, double? lat, double? lon, double radius)
        {
            return keyPoints.Any(keyPoint => IsInRange(keyPoint, lat, lon, radius));
        }

        public bool IsInRange(TourKeyPoint keyPoint, double? lat, double? lon, double radius)
        {
            double distance;
            int earthRadius = 6371000;
            double radiusInDegrees = radius * 360 / (2 * Math.PI * earthRadius);
            distance = Math.Sqrt(Math.Pow((double)(keyPoint.Latitude - lat), 2) +
                                 Math.Pow((double)(keyPoint.Longitude - lon), 2));
            return distance <= radiusInDegrees;
        }

        public Result<PagedResult<TourDto>> GetPagedByIds(List<int> ids, int page, int pageSize)
        {
            var result = _tourRepository.GetPagedByIds(ids, page, pageSize);
            return MapToDto(result);
        }
        public List<TourDto> GetAllByAuthorId(int authorId)
        {
            var result = _tourRepository.GetPagedByAuthorId(authorId, 0, 0);
            return MapToDto(result.Results).Value;
        }
        public Result<PagedResult<TourDto>> GetAllPagedByAuthorId(int authorId)
        {
            return GetPagedByAuthorId(authorId, 0, 0);
        }
    }

}
