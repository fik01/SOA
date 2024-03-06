using Explorer.API.Controllers.Administrator.Administration;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Public;
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

namespace Explorer.Stakeholders.Tests.Integration.Administration
{
    [Collection("Sequential")]
    public class AdministratorQueryTests:BaseStakeholdersIntegrationTest
    {
        public AdministratorQueryTests(StakeholdersTestFactory factory):base(factory) { }

        [Fact]
        public void Retrieves_all()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetPaged(0, 0).Result)?.Value as PagedResult<UserInformationDto>;

            // Assert
            result.Results.ShouldNotBeNull();
            result.Results.Count.ShouldBe(7);
            result.TotalCount.ShouldBe(9);
        }
        private static UserInformationController CreateController(IServiceScope scope)
        {
            return new UserInformationController(scope.ServiceProvider.GetRequiredService<IUserInformationService>(), scope.ServiceProvider.GetRequiredService<IPersonInformationService>(),scope.ServiceProvider.GetRequiredService<IUserActivityService>(), scope.ServiceProvider.GetRequiredService<IWalletService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
