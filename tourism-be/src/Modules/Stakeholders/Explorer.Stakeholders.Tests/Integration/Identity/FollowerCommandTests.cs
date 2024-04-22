using Explorer.API.Controllers.Tourist.Identity;
using Explorer.API.Controllers.Execution;
using Explorer.Stakeholders.API.Public.Identity;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Execution;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.Stakeholders.API.Dtos;
using Shouldly;
using Explorer.Stakeholders.Infrastructure.Database;
using Explorer.Blog.Infrastructure.Database;

namespace Explorer.Stakeholders.Tests.Integration.Identity
{
    [Collection("Sequential")]
    public class FollowerCommandTests : BaseStakeholdersIntegrationTest
    {
        public FollowerCommandTests(StakeholdersTestFactory factory) : base(factory)
        {

        }

        /*[Theory]
        [MemberData(nameof(FollowerDto))]
        public void Create_session(FollowerDto follower, int expectedResponseCode)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();

            var result = (ObjectResult)controller.Create(follower).Result;

            result.StatusCode.ShouldBe(expectedResponseCode);

            // Assert - Database
            var storedEntity = dbContext.Followers.FirstOrDefault(t => t.Id == follower.Id);
            storedEntity.ShouldNotBeNull();
        }

        [Theory]
        [InlineData(-22, -12, 200)]
        public void Delete_session(int followerId, int followedId, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();

            var result = (OkResult)controller.Delete(followerId, followedId);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            //Assert - Database
            var storedEntity = dbContext.Followers.FirstOrDefault(f => f.FollowerId == followerId && f.FollowedId == followedId);
            storedEntity.ShouldBeNull();
        }

        [Theory]
        [InlineData(-25, -12, 404)]
        public void Delete_session_fail(int followerId, int followedId, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();

            var result = (ObjectResult)controller.Delete(followerId, followedId);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            //Assert - Database
            var storedEntity = dbContext.Followers.FirstOrDefault(f => f.FollowerId == followerId && f.FollowedId == followedId);
            storedEntity.ShouldBeNull();
        }
        public static IEnumerable<object[]> FollowerDto()
        {
            return new List<object[]>
            {
                new object[]
                {
                    new FollowerDto
                    {
                        Id = -11,
                        FollowerId = -11,
                        FollowedId = -21,
                        Notification = new FollowerNotificationDto()
                    },
                    200
                }
            };
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
