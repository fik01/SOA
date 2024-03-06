using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Author;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Explorer.Tours.Tests.Integration
{
    [Collection("Sequential")]
    public class TouristTourKeyPointQueryTest : BaseToursIntegrationTest
    {
        public TouristTourKeyPointQueryTest(ToursTestFactory factory) : base(factory)
        {
        }
        private static Explorer.API.Controllers.Tourist.TourKeyPointController CreateController(IServiceScope scope)
        {
            return new Explorer.API.Controllers.Tourist.TourKeyPointController(scope.ServiceProvider.GetRequiredService<ITourKeyPointService>(), scope.ServiceProvider.GetRequiredService<IPublicTourKeyPointService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }

        [Fact]
        public void RetrievesAllByPublicId()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.GetAllByPublicKeypointId(-5).Result);

            //Assert
            result.ShouldNotBe(null);
            result.StatusCode.ShouldBe(200);
        }

    }
}
