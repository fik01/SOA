using Explorer.API.Controllers.Execution;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Execution;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Tests.Integration.TourExecution
{
    public class PositionSimulatorCommandTests : BaseToursIntegrationTest
    {
        public PositionSimulatorCommandTests(ToursTestFactory factory) : base(factory)
        {
        }

        //[Fact]
        //public void Creates()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
        //    var newEntity = new PositionSimulatorDto
        //    {
        //        Id = -24,
        //        Latitude = 44.4,
        //        Longitude = 44.4,
        //        TouristId = -24,
        //    };

        //    // Act
        //    var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as PositionSimulatorDto;

        //    // Assert - Response
        //    result.ShouldNotBeNull();
        //    result.Id.ShouldNotBe(0);
        //    result.Longitude.ShouldBe(newEntity.Longitude);

        //    // Assert - Database
        //    var storedEntity = dbContext.PositionSimulators.FirstOrDefault(i => i.Longitude == newEntity.Longitude);
        //    storedEntity.ShouldNotBeNull();
        //    storedEntity.Id.ShouldBe(result.Id);
        //}

        //[Fact]
        //public void Create_fails_invalid_data()
        //{
        //    //Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var newEntity = new PositionSimulatorDto()
        //    {
        //        Latitude = -1000
        //    };

        //    // Act
        //    var result = (ObjectResult)controller.Create(newEntity).Result;

        //    // Assert
        //    result.ShouldNotBeNull();
        //    result.StatusCode.ShouldBe(400);
        //}

        //[Fact]
        //public void Update()
        //{
        //    //Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
        //    var updatedEntity = new PositionSimulatorDto
        //    {
        //        Id = -21,
        //        Longitude = 10,
        //        Latitude = 10,
        //        TouristId = -21
        //    };

        //    //Act
        //    var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as PositionSimulatorDto;

        //    // Assert - Response
        //    result.ShouldNotBeNull();
        //    result.Id.ShouldBe(-21);
        //    result.Latitude.ShouldBe(updatedEntity.Latitude);
        //    result.Longitude.ShouldBe(updatedEntity.Longitude);
        //    result.TouristId.ShouldBe(updatedEntity.TouristId);

        //    // Assert - Database
        //    var storedEntity = dbContext.PositionSimulators.FirstOrDefault(i => i.Id == -21);
        //    storedEntity.ShouldNotBeNull();
        //    storedEntity.Latitude.ShouldBe(updatedEntity.Latitude);
        //}

        //[Fact]
        //public void Update_fails_invalid_value()
        //{
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var updatedEntity = new PositionSimulatorDto
        //    {
        //        Id = -23,
        //        Latitude = -1000
        //    };

        //    //Act
        //    var result = (ObjectResult)controller.Update(updatedEntity).Result;

        //    //Assert
        //    result.ShouldNotBeNull();
        //    result.StatusCode.ShouldBe(400);
        //}

        //[Fact]
        //public void Update_fail_invalid_id()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var updatedEntity = new PositionSimulatorDto
        //    {
        //        Id = -25,
        //        Longitude = 10,
        //        Latitude = 10,
        //        TouristId = -25
        //    };

        //    // Act
        //    var result = (ObjectResult)controller.Update(updatedEntity).Result;

        //    // Assert
        //    result.ShouldNotBeNull();
        //    result.StatusCode.ShouldBe(404);
        //}

        //private static PositionSimulatorController CreateController(IServiceScope scope)
        //{
        //    return new PositionSimulatorController(scope.ServiceProvider.GetRequiredService<IPositionSimulatorService>())
        //    {
        //        ControllerContext = BuildContext("-1")
        //    };
        //}
    }
}
