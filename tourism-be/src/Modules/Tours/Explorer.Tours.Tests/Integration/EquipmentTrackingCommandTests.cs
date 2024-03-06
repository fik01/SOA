using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Tourist;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Tests.Integration
{
    [Collection("Sequential")]
    public class EquipmentTrackingCommandTests : BaseToursIntegrationTest
    {
        public EquipmentTrackingCommandTests(ToursTestFactory factory) : base(factory){}
        [Fact]
        public void Creates()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
            var newEntity = new EquipmentTrackingDto
            {
                Id = -10,
                TouristId = -21,
                NeededEquipment = new List<long> {  }
            };

            // Act
            var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as EquipmentTrackingDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldNotBe(0);
            result.TouristId.ShouldBe(newEntity.TouristId);

            // Assert - Database
            var storedEntity = dbContext.EquipmentTrackings.FirstOrDefault(i => i.Id == newEntity.Id);
            storedEntity.ShouldNotBeNull();
            storedEntity.Id.ShouldBe(result.Id);
        }
      
        [Fact]
        public void Updates()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
            var updatedEntity = new EquipmentTrackingDto
            {
                Id = -1,
                TouristId = -23,
                NeededEquipment = new List<long> { -2 }
            };

            // Act
            var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as EquipmentTrackingDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldBe(-1);
            result.TouristId.ShouldBe(-23);
            result.NeededEquipment.ShouldBe(updatedEntity.NeededEquipment);

            // Assert - Database
            var storedEntity = dbContext.EquipmentTrackings.FirstOrDefault(i => i.TouristId == -23);
            storedEntity.ShouldNotBeNull();
            storedEntity.NeededEquipment.ShouldBe(updatedEntity.NeededEquipment);
            var oldEntity = dbContext.EquipmentTrackings.FirstOrDefault(i => i.TouristId == -21);
            oldEntity.ShouldBeNull();
        }

        [Fact]
        public void Update_fails_invalid_id()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var updatedEntity = new EquipmentTrackingDto
            {
                Id = 1000,
                TouristId = 12
            };

            // Act
            var result = (ObjectResult)controller.Update(updatedEntity).Result;

            // Assert
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(404);
        }

        private static EquipmentTrackingController CreateController(IServiceScope scope)
        {
            return new EquipmentTrackingController(scope.ServiceProvider.GetRequiredService<IEquipmentTrackingService>(), scope.ServiceProvider.GetRequiredService<IEquipmentService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
