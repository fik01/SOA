using Explorer.API.Controllers.Author;
using Explorer.Blog.API.Dtos;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Tests.Integration
{
    [Collection("Sequential")]
    public class BundleQueryTests : BasePaymentsIntegrationTest
    {
        public BundleQueryTests(PaymentsTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Retrieves_all()
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            var result = ((ObjectResult)controller.GetAll(0, 0).Result)?.Value as PagedResult<BundleDto>;

            result.ShouldNotBeNull();
            result.Results.Count.ShouldBe(2);
        }
        [Theory]
        [InlineData(-2, 200)]
        [InlineData(-101, 404)]
        public void Retrieves_by_id(int id,int expectCode)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            var result = ((ObjectResult)controller.Get(id).Result);

            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectCode);
        }

        [Theory]
        [InlineData(-4, 200)]
        public void Retrieves_by_authorId(int authorId, int expectCode)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            var result = (ObjectResult)controller.GetByAuthorId(0, 0, authorId).Result;

            result.StatusCode.ShouldBe(expectCode);
            result.ShouldNotBeNull();

            if (expectCode == 200)
            {
                var result2 = (result)?.Value as PagedResult<BundleDto>;
                result2.Results.Count.ShouldBe(2);
            }
            
        }

        [Theory]
        [InlineData(-400, 200)]
        public void Retrieves_by_authorId_fail(int authorId, int expectCode)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            var result = (ObjectResult)controller.GetByAuthorId(0, 0, authorId).Result;

            result.StatusCode.ShouldBe(expectCode);
            result.ShouldNotBeNull();

            if (expectCode == 200)
            {
                var result2 = (result)?.Value as PagedResult<BundleDto>;
                result2.Results.Count.ShouldBe(0);
            }

        }


        private static BundleController CreateController(IServiceScope scope)
        {
            return new BundleController(scope.ServiceProvider.GetRequiredService<IBundleService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
