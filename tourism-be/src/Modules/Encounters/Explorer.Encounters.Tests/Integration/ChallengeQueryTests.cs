using Explorer.API.Controllers.Administrator;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Encounters.Infrastructure.Database;
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

namespace Explorer.Encounters.Tests.Integration
{
    [Collection("Sequential")]
    public class ChallengeQueryTests : BaseEncountersIntegrationTest
    {
        public ChallengeQueryTests(EncountersTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Retrieves_all()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetAll(0, 0).Result)?.Value as PagedResult<ChallengeDto>;

            // Assert
            result.ShouldNotBeNull();
            result.Results.Count.ShouldBe(6);
            result.TotalCount.ShouldBe(6);
        }

        

        private static ChallengeController CreateController(IServiceScope scope)
        {
            return new ChallengeController(scope.ServiceProvider.GetRequiredService<IChallengeService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }

}
