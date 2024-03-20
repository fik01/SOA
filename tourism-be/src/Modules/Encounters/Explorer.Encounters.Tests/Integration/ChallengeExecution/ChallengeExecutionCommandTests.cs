using Explorer.API.Controllers.Tourist.Execution;
using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Public;
using Explorer.Encounters.Infrastructure.Database;
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
    public class ChallengeExecutionCommandTests : BaseEncountersIntegrationTest
    {
        public ChallengeExecutionCommandTests(EncountersTestFactory factory) : base(factory)
        {
        }

        //[Fact]
        //public void Creates()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<EncountersContext>();
        //    var newEntity = new ChallengeExecutionDto
        //    {
        //        Id = 1,
        //        TouristId = -21,
        //        ChallengeId = -1,
        //        Latitude = 0,
        //        Longitude = 0,
        //        ActivationTime = DateTime.UtcNow,
        //        CompletionTime = null,
        //        IsCompleted = false,
        //    };

        //    // Act
        //    var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as ChallengeExecutionDto;

        //    // Assert - Response
        //    result.ShouldNotBeNull();
        //    result.Id.ShouldNotBe(0);
        //    result.TouristId.ShouldBe(newEntity.TouristId);
        //    result.Longitude.ShouldBe(newEntity.Longitude);
        //    result.Latitude.ShouldBe(newEntity.Latitude);
        //    result.ActivationTime.ShouldBe(newEntity.ActivationTime);

        //    // Assert - Database
        //    var storedEntity = dbContext.ChallengeExecutions.FirstOrDefault(i => i.Id == result.Id);
        //    storedEntity.ShouldNotBeNull();
        //    storedEntity.Id.ShouldBe(result.Id);
        //}

        //private static ChallengeExecutionController CreateController(IServiceScope scope)
        //{
        //    return new ChallengeExecutionController(scope.ServiceProvider.GetRequiredService<IChallengeExecutionService>())
        //    {
        //        ControllerContext = BuildContext("-1")
        //    };
        //}
    }
}
