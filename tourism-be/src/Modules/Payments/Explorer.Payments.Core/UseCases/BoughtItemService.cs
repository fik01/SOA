using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.Tours.API.Internal;
using Explorer.Payments.API.Dtos.Statistics;
using Explorer.Payments.API.Dtos.ListedTours;
using Explorer.Payments.API.Internal;
using Explorer.Payments.Core.Domain.ServiceInterfaces;
using Explorer.Tours.API.Dtos.Statistics;

namespace Explorer.Payments.Core.UseCases
{
    public class BoughtItemService : BaseService<BoughtItemDto, BoughtItem>, IBoughtItemService, IInternalBoughtItemService
    {
        private readonly IMapper mapper;
        private IBoughtItemRepository shoppingCartRepository;
        private IInternalTourService internalTourUsageService;
        private readonly ITourStatisticsDomainService _tourStatisticsDomainService;

        public BoughtItemService(IMapper mapper, IBoughtItemRepository shoppingCartRepository, IInternalTourService internalTourUsageService, ITourStatisticsDomainService tourStatisticsDomainService) : base(mapper)
        {
            this.shoppingCartRepository = shoppingCartRepository;
            this.internalTourUsageService = internalTourUsageService;
            this.mapper = mapper;
            _tourStatisticsDomainService = tourStatisticsDomainService;
        }


        public Result<List<ListedTourDto>> GetUnusedTours(long userId)
        {
            List<ListedTourDto> tourDtos = new List<ListedTourDto>();
            foreach (BoughtItem item in shoppingCartRepository.GetAllByUserId(userId))
            {
                if (!item.IsUsed)
                {
                    var result = internalTourUsageService.Get(item.TourId);
                    if (result.IsFailed) return Result.Fail(result.Errors);
                    tourDtos.Add(mapper.Map<ListedTourDto>(result.Value));
                }
            }

            return tourDtos;
        }

        public Result<List<ListedTourDto>> GetUsedTours(long userId)
        {
            List<ListedTourDto> tourDtos = new List<ListedTourDto>();
            foreach (BoughtItem item in shoppingCartRepository.GetAllByUserId(userId))
            {
                if (item.IsUsed)
                {
                    var result = internalTourUsageService.Get(item.TourId);
                    if (result.IsFailed) return Result.Fail(result.Errors);
                    tourDtos.Add(mapper.Map<ListedTourDto>(result.Value));
                }
            }

            return tourDtos;
        }

        public Result Create(List<BoughtItemDto> items)
        {
            {
                try
                {
                    foreach (var item in items)
                        shoppingCartRepository.AddToCart(MapToDomain(item));
                }
                catch (Exception e)
                {
                    return Result.Fail(FailureCode.NotFound).WithError(e.Message);
                }

                return Result.Ok();
            }
        }

        public Result DeleteItem(long tourId, long userId)
        {
            try
            {
                shoppingCartRepository.DeleteItem(tourId, userId);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }

            return Result.Ok();
        }

        public Result UpdateItem(long userId, long tourId)
        {
            try
            {
                shoppingCartRepository.GetItemToUpdate(userId, tourId);
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }

            return Result.Ok();
        }

        public Result<List<SoldTourStatisticsDto>> GetSoldToursStatistics()
        {
            var boughtItems = shoppingCartRepository.GetAll();

            var domainStatistics = _tourStatisticsDomainService.CalculateSoldToursStatistics(boughtItems);

            var mostSoldToursStatistics = new List<SoldTourStatisticsDto>();

            /*foreach (var item in boughtItems)
            {
                var matchingStat = mostSoldToursStatistics.FirstOrDefault(stat => stat.TourId == item.TourId);

                if (matchingStat != null)
                {
                    matchingStat.NumberOfStats += 1;
                }
                else
                {
                    SoldTourStatisticsDto stat = new SoldTourStatisticsDto();
                    stat.TourId = item.TourId;
                    stat.NumberOfStats = 1;
                    mostSoldToursStatistics.Add(stat);
                }
            }*/

            foreach (var stat in domainStatistics)
            {
                SoldTourStatisticsDto statDto = new SoldTourStatisticsDto();
                statDto.TourId = stat.TourId;
                statDto.NumberOfStats = stat.NumberOfStats;
                mostSoldToursStatistics.Add(statDto);
            }

            return mostSoldToursStatistics;
        }

        public Result<BoughtItemDto> CreateBoughtItem(BoughtItemDto boughtItemDto)
        {
            try
            {
                shoppingCartRepository.AddToCart(MapToDomain(boughtItemDto));
            }
            catch (Exception e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }

            return Result.Ok();
        }

        public Result<PagedResult<ListedTourDto>> GetPagedToursByTouristId(long touristId, int page, int pageSize)
        {
            var boughtTourIds = shoppingCartRepository.GetAllByUserId(touristId).Select(bi => bi.TourId).ToList();
            var result = internalTourUsageService.GetPagedByIds(boughtTourIds, page, pageSize).Value.Results.Select(t => mapper.Map<ListedTourDto>(t)).ToList();
            return new PagedResult<ListedTourDto>(result, result.Count);

        }

        public Result<List<BoughtItemDto>> GetByTourId(long tourId)
        {
            try
            {
                List<BoughtItemDto> boughtItems = new List<BoughtItemDto>();
                foreach (BoughtItem item in shoppingCartRepository.GetByTourId(tourId))
                {
                    boughtItems.Add(MapToDto(item));
                }
                return Result.Ok(boughtItems);
            }
            catch (Exception e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }

        public Result<List<BoughtItemDto>> GetAll()
        {
            try
            {
                List<BoughtItemDto> boughtItems = new List<BoughtItemDto>();
                foreach (BoughtItem item in shoppingCartRepository.GetAll())
                {
                    boughtItems.Add(MapToDto(item));
                }
                return Result.Ok(boughtItems);
            }
            catch (Exception e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }
        public Result<List<BoughtItemDto>> GetUsedByUserId(int userId)
        {
            var boughtItems = shoppingCartRepository.GetAllByUserId(userId);
            return MapToDto(boughtItems);
        }
        /*public Result<List<BoughtItemDto>> GetAll()
        {
            var list= shoppingCartRepository.GetAll().ToResult();
            List<BoughtItemDto> boughtItems = new List<BoughtItemDto>();
            foreach (var item in list.Value) 
            {
                BoughtItemDto itemDto = new BoughtItemDto();
                itemDto.TourId= item.TourId;
                itemDto.Id = Convert.ToInt32(item.Id);
                boughtItems.Add(itemDto);
            }
            return boughtItems.ToResult();
        }*/
    }
}
