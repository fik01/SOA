using Explorer.API.Controllers.Author;
using Explorer.API.Controllers.Shopping;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Infrastructure.Database;
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
    public class PaymentRecordCommandTests : BasePaymentsIntegrationTest
    {
        public PaymentRecordCommandTests(PaymentsTestFactory factory) : base(factory)
        {
        }

        [Theory]
        [MemberData(nameof(PaymentRecorCreateDto))]
        public void Create_payment_record(PaymentRecordDto paymentRecordDto, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            var result = (ObjectResult)controller.Create(paymentRecordDto).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            // Assert - Database

            if (result.StatusCode != 400)
            {
                var storedEntity = dbContext.PaymentRecords.FirstOrDefault(t => t.Id == paymentRecordDto.Id);
                storedEntity.ShouldNotBeNull();
            }
        }

        public static IEnumerable<object[]> PaymentRecorCreateDto()
        {
            return new List<object[]>
                {
                    new object[]
                    {
                        new PaymentRecordDto{
                            Id=-10,
                            TouristId = -21,
                            BundleId = -1,
                            Price = 200,
                            DateTimeOfBuying = DateTime.UtcNow
                        },
                        200
                    }
                };
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
