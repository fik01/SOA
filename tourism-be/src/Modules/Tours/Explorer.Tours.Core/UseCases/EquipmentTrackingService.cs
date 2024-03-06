using AutoMapper;
using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System.Reflection.Metadata;

namespace Explorer.Tours.Core.UseCases;

public class EquipmentTrackingService : BaseService<EquipmentTrackingDto, EquipmentTracking>, IEquipmentTrackingService
{
    private readonly IEquipmentTrackingRepository _equipmentTrackingRepository;
    private readonly IMapper _mapper;
    public EquipmentTrackingService(ICrudRepository<EquipmentTracking> repository, IMapper mapper, IEquipmentTrackingRepository equipmentTrackingRepository) : base(mapper) { 
        _equipmentTrackingRepository = equipmentTrackingRepository;
        _mapper = mapper;
    }
    public Result<EquipmentTrackingDto> GetByTouristId(long touristId)
    {
        EquipmentTracking entity = _equipmentTrackingRepository.GetByTouristId(touristId);
        return MapToDto(entity);
    } 
    
    public Result<EquipmentTrackingDto> Update(EquipmentTrackingDto dto)
    {
        try
        {
            var result = _equipmentTrackingRepository.Update(MapToDomain(dto));
            return MapToDto(result);
        }
        catch (KeyNotFoundException e)
        {
            return Result.Fail(FailureCode.NotFound).WithError(e.Message);
        }
        catch (ArgumentException e)
        {
            return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
        }
    }
    public virtual Result<EquipmentTrackingDto> Create(EquipmentTrackingDto entity)
    {
        try
        {
            var result = _equipmentTrackingRepository.Create(MapToDomain(entity));
            return MapToDto(result);
        }
        catch (ArgumentException e)
        {
            return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
        }
    }
}