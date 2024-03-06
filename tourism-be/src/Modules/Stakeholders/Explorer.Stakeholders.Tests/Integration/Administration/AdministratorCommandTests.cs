using Explorer.API.Controllers.Administrator.Administration;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Public;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Infrastructure.Database;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.Infrastructure.Database;
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
    public class AdministratorCommandTests : BaseStakeholdersIntegrationTest
    {
        public AdministratorCommandTests(StakeholdersTestFactory factory) : base(factory) { }

        [Fact]
        public void Updates()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();
            var updatedEntity = new UserDto 
            {
                Id=-12,
                Username= "autor2@gmail.com",
                Password= "autor2",
                Role="Author",
                IsActive=true
            };

            // Act
            var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as UserDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldBe(-12);
            result.IsActive.ShouldBe(false); 

            // Assert - Database
            var storedEntity = dbContext.Users.FirstOrDefault(u => u.IsActive== false && u.Username == "autor2@gmail.com");
            storedEntity.ShouldNotBeNull();
            var oldEntity = dbContext.Users.FirstOrDefault(u => u.IsActive == true && u.Username== "autor2@gmail.com");
            oldEntity.ShouldBeNull();
        }
        private static UserInformationController CreateController(IServiceScope scope)
        {
            return new UserInformationController(scope.ServiceProvider.GetRequiredService<IUserInformationService>(), scope.ServiceProvider.GetRequiredService<IPersonInformationService>(), scope.ServiceProvider.GetRequiredService<IUserActivityService>(), scope.ServiceProvider.GetRequiredService<IWalletService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
