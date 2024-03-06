using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.API.Controllers.Tourist;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;


namespace Explorer.Stakeholders.Tests.Integration
{
    [Collection("Sequential")]
    public class JoinRequestCommandTest : BaseStakeholdersIntegrationTest
    {
        public JoinRequestCommandTest(StakeholdersTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Creates()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();
            var newEntity = new JoinRequestDto
            {
                Id = 0,
                ClubId = -1,
                UserId = -21,
                RequestDirection = true,
                RequestStatus = "pending"
            };

            //Act
            var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as JoinRequestDto;

            //Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldNotBe(0);

            //Assert - Database
            var storedEntity = dbContext.JoinRequests.FirstOrDefault(i => i.Id == result.Id);
            storedEntity.ShouldNotBeNull();
        }

        [Fact]
        public void CreateFailsInvalidData()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var newEntity = new JoinRequestDto()
            {
                RequestStatus = "giga"
            };

            // Act
            var result = (ObjectResult)controller.Create(newEntity).Result;

            // Assert
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(400);
        }

        public void Kick()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();

            //Act
            var result = ((ObjectResult)controller.KickMember(-1,-1).Result);

            // Assert - Response
            result.ShouldNotBeNull();
            result.Value.ShouldBeOfType<long>();
            result.Value.ShouldBe(-1);

            // Assert - Database
            var storedEntity = dbContext.JoinRequests.FirstOrDefault(i => i.UserId == -1 && i.ClubId==-1 && i.RequestStatus=="declined");
            storedEntity.ShouldNotBeNull();
        }




        private static RequestController CreateController(IServiceScope scope)
        {
            return new RequestController(scope.ServiceProvider.GetRequiredService<IJoinRequestService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
