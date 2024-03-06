using Explorer.API.Controllers.Execution;
using Explorer.Blog.Infrastructure.Database;
using Explorer.Tours.API.Public.Execution;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Tests.Integration.TourExecution
{
    [Collection("Sequential")]
    public class SessionQueryTests : BaseToursIntegrationTest
    {
        public SessionQueryTests(ToursTestFactory factory) : base(factory)
        {

        }

        [Theory]
        [InlineData(-21, 200)]
        public void Get_by_tourist_id(int id, int expectedResponseCode)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (ObjectResult)controller.GetActiveSessionByTouristId(id).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);
        }

        [Theory]
        [InlineData(-1,-21, 200)]
        public void Get_by_tour_and_tourist_id(int tourId, int touristId, int expectedResponseCode)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (ObjectResult)controller.GetByTourAndTouristId(tourId,touristId).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);
        }

        [Theory]
        [InlineData(-1, 200, true)]
        public void Check_valid_for_tourist_comment(int id, int expectedResponseCode, bool expectedResponse)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (ObjectResult)controller.Check(id).Result;

            // Assert - Response
            result.Value.ShouldBe(expectedResponse);
            result.StatusCode.ShouldBe(expectedResponseCode);

        }

        [Theory]
        [InlineData(-6,404)]
        public void Check_valid_for_tourist_comment_notfound(int id, int expectedResponseCode)
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (ObjectResult)controller.Check(id).Result;

            // Assert - Response
            result.StatusCode.ShouldBe(expectedResponseCode);            

        }

        private static SessionController CreateController(IServiceScope scope)
        {
            return new SessionController(scope.ServiceProvider.GetRequiredService<ISessionService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
