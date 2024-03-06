using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Tourist;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
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

namespace Explorer.Payments.Tests.Integration.Wallet
{
    [Collection("Sequential")]
    public class WalletQueryTests:BasePaymentsIntegrationTest
    {
        public WalletQueryTests(PaymentsTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Retrives_by_id()
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            var result = ((ObjectResult)controller.GetWalletByUserId(-21))?.Value as WalletDto;

            result.ShouldNotBeNull();
            result.UserId.ShouldBe(-21);

        }

        private static BoughtItemController CreateController(IServiceScope scope)
        {
            return new BoughtItemController(scope.ServiceProvider.GetRequiredService<IBoughtItemService>(),scope.ServiceProvider.GetRequiredService<ICouponService>(), scope.ServiceProvider.GetRequiredService<IWalletService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }

    }

    
}
