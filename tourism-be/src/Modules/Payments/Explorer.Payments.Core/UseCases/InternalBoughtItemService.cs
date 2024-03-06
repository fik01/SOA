using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Dtos.ListedTours;
using Explorer.Payments.API.Internal;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.API.Dtos;
using FluentResults;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.UseCases
{
    public class InternalBoughtItemService : BaseService<BoughtItemDto, BoughtItem>, IInternalBoughtItemService
    {
        public IInternalBoughtItemDatabaseRepository _internalBoughtItemDatabaseRepository;

        public InternalBoughtItemService(IInternalBoughtItemDatabaseRepository internalBoughtItemDatabaseRepository, IMapper mapper) : base(mapper)
        {
            _internalBoughtItemDatabaseRepository = internalBoughtItemDatabaseRepository;
        }


        public Result<BoughtItemDto> CreateBoughtItem(BoughtItemDto boughtItemDto)
        {
            try
            {
                _internalBoughtItemDatabaseRepository.CreateBoughtItem(MapToDomain(boughtItemDto));
            }
            catch (Exception e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }

            return Result.Ok();
        }


        public Result<List<BoughtItemDto>> GetUsedByUserId(int userId)
        {
            var boughtItems = _internalBoughtItemDatabaseRepository.GetByUserId(userId);
            return MapToDto(boughtItems);
        }


        public Result<List<BoughtItemDto>> GetByTourId(long tourId)
        {
            try
            {
                List<BoughtItemDto> boughtItems = new List<BoughtItemDto>();
                foreach (BoughtItem item in _internalBoughtItemDatabaseRepository.GetByTourId(tourId))
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
                foreach (BoughtItem item in _internalBoughtItemDatabaseRepository.GetAll())
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
    }
}
