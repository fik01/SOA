using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Author;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Tests.Integration.People
{
    [Collection("Sequential")]
    public class TouristQueryTests : BaseStakeholdersIntegrationTest
    {
        public TouristQueryTests(StakeholdersTestFactory factory) : base(factory) { }

        [Fact]
        public void Get_authors_and_tourists()
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetAuthorsAndTourists().Result)?.Value as List<PersonDto>;

            // Assert
            result.ShouldNotBeNull();
            result.Count.ShouldBe(7);
        }

        [Fact]
        public void Get_by_id()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.Get(-21).Result)?.Value as PersonDto;

            // Assert
            result.ShouldNotBeNull();
            result.Id.ShouldBe(-21);
        }

        [Fact]
        public void Get_by_id_fails_invalid_id()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = (ObjectResult)controller.Get(-100000000).Result;

            // Assert
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(404);
        }

        private static PersonController CreateController(IServiceScope scope)
        {
            return new PersonController(scope.ServiceProvider.GetRequiredService<IPersonService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
