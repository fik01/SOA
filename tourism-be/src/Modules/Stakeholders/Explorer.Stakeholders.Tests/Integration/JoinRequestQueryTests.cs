using Explorer.API.Controllers.Tourist;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Tests.Integration
{
    [Collection("Sequential")]
    public class JoinRequestQueryTests : BaseStakeholdersIntegrationTest
    {
        public JoinRequestQueryTests(StakeholdersTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void RetrievesMembers()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.GetMembers(-1,1,5).Result)?.Value as PagedResult<ClubMemberDto>;

            //Assert
            result.ShouldNotBe(null);
        }

        [Fact]
        public void RetrievesInvitableUsers()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.GetInvitableUsers(-1,1,5).Result)?.Value as PagedResult<ClubMemberDto>;

            //Assert
            result.ShouldNotBe(null);
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
