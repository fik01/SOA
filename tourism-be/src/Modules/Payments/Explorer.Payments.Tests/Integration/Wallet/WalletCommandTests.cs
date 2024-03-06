using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Tourist;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Stakeholders.API.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Tests.Integration.Wallet
{
    public class WalletCommandTests : BasePaymentsIntegrationTest
    {
        public WalletCommandTests(PaymentsTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Add_to_balance()
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            var result = ((ObjectResult)controller.AddToBalance(-21,50))?.Value as WalletDto;

            result.ShouldNotBeNull();
            result.UserId.ShouldBe(-21);
            result.Balance.ShouldBe(100);

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
