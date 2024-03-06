using Explorer.API.Controllers.Execution;
using Explorer.Tours.API.Public.Execution;
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
    public class PositionSimulatorQueryTests : BaseToursIntegrationTest
    {
        public PositionSimulatorQueryTests(ToursTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Retrieves_one()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.Get(-21).Result);

            //Assert
            result.ShouldNotBe(null);
            result.StatusCode.ShouldBe(200);
        }

        [Fact]
        public void Retrieves_one_failed_invalid_id()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.Get(-1000).Result);

            //Assert
            result.StatusCode.ShouldBe(404);
        }

        private static PositionSimulatorController CreateController(IServiceScope scope)
        {
            return new PositionSimulatorController(scope.ServiceProvider.GetRequiredService<IPositionSimulatorService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
