using Explorer.API.Controllers.Tourist.Identity;
using Explorer.Stakeholders.API.Public.Identity;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Tests.Integration.Identity
{
    [Collection("Sequential")]
    public class FollowerQueryTests : BaseStakeholdersIntegrationTest
    {
        public FollowerQueryTests(StakeholdersTestFactory factory) : base(factory)
        {

        }

        /*[Theory]
        [InlineData(-11, 200)]
        public void Get_followers_notifications(int id, int expectedResponseCode)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (ObjectResult)controller.GetFollowersNotifications(id).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);
        }

        private static FollowerController CreateController(IServiceScope scope)
        {
            return new FollowerController(scope.ServiceProvider.GetRequiredService<IFollowerService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }*/
    }
}
