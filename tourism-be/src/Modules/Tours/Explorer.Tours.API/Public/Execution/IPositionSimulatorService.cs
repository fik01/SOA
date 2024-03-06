using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Public.Execution
{
    public interface IPositionSimulatorService
    {
        Result<PositionSimulatorDto> Create(PositionSimulatorDto positionSimulatorDto);
        Result<PositionSimulatorDto> Update(PositionSimulatorDto positionSimulatorDto);
        Result<PositionSimulatorDto> Get(int id);

        Result<PositionSimulatorDto> GetByTouristId(long touristId);
    }
}
