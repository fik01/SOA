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

namespace Explorer.Encounters.Tests.Integration
{
    [Collection("Sequential")]

    public class UserExperienceCommandTests : BaseEncountersIntegrationTest
    {
        public UserExperienceCommandTests(EncountersTestFactory factory) : base(factory)
        {
        }

        //[Fact]
        //public void Update()
        //{
        //    using var scope=Factory.Services.CreateScope();
        //    var controller= CreateController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<EncountersContext>();
        //    var updatedUserExperience = new UserExperienceDto
        //    {
        //        Id = -1,
        //        UserId = -21,
        //        XP = 150,
        //        Level = 8
        //    };
        //    var result = ((ObjectResult)controller.Update(updatedUserExperience).Result)?.Value as UserExperienceDto;

        //    result.ShouldNotBeNull();
        //    result.Level.ShouldBe(8);

        //    var storedEntity = dbContext.UserExperience.FirstOrDefault(i => i.Level == 8);
        //    storedEntity.ShouldNotBeNull();
        //    storedEntity.XP.ShouldBe(updatedUserExperience.XP);
        //    var oldEntity = dbContext.UserExperience.FirstOrDefault(i => i.XP==0);
        //    oldEntity.ShouldBeNull();

        //}

        //[Fact]
        //public void UpdateFail()
        //{
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<EncountersContext>();
        //    var updatedUserExperience = new UserExperienceDto
        //    {
        //        Id = -1000,
        //        UserId = -21,
        //        XP = 150,
        //        Level = 8
        //    };
        //    var result = ((ObjectResult)controller.Update(updatedUserExperience).Result);

        //    result.ShouldNotBeNull();

        //    result.StatusCode.ShouldBe(404);

        //}
        //private static UserExperienceController CreateController(IServiceScope scope)
        //{
        //    return new UserExperienceController(scope.ServiceProvider.GetRequiredService<IUserExperienceService>(), scope.ServiceProvider.GetService<IChallengeExecutionService>())
        //    {
        //        ControllerContext = BuildContext("-1")
        //    };
        //}
    }
}
