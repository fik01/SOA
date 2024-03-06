using Explorer.API.Controllers.Shopping;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Tests.Integration
{
    public class PaymentRecordQueryTests : BasePaymentsIntegrationTest
    {
        public PaymentRecordQueryTests(PaymentsTestFactory factory) : base(factory)
        {
        }

        public void Retrieves_all()
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            var result = ((ObjectResult)controller.GetAll(0, 0).Result)?.Value as PagedResult<PaymentRecordDto>;

            result.ShouldNotBeNull();
            result.Results.Count.ShouldBe(1);
        }

        private static PaymentRecordController CreateController(IServiceScope scope)
        {
            return new PaymentRecordController(scope.ServiceProvider.GetRequiredService<IPaymentRecordService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
