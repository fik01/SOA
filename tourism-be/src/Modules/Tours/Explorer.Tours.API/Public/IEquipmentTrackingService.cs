using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using FluentResults;

namespace Explorer.Tours.API.Public;

public interface IEquipmentTrackingService
{
    Result<EquipmentTrackingDto> Update(EquipmentTrackingDto equipmentTrackingDto);
    Result<EquipmentTrackingDto> GetByTouristId(long touristId);
    Result<EquipmentTrackingDto> Create(EquipmentTrackingDto equipmentTrackingDto);
}