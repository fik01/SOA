using Explorer.API.Controllers.Tourist.Execution;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Tours.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Tests.Integration.ChallengeExecution
{
    [Collection("Sequential")]
    public class ChallengeExecutionQueryTests : BaseEncountersIntegrationTest
    {
        public ChallengeExecutionQueryTests(EncountersTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Retrieves_all()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetAll(0, 0).Result)?.Value as PagedResult<ChallengeExecutionDto>;

            // Assert
            result.ShouldNotBeNull();
            result.Results.Count.ShouldBe(3);
            result.TotalCount.ShouldBe(3);
        }

        private static ChallengeExecutionController CreateController(IServiceScope scope)
        {
            return new ChallengeExecutionController(scope.ServiceProvider.GetRequiredService<IChallengeExecutionService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }

}
