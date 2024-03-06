using Explorer.API.Controllers.Author.Authoring;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Authoring;
using Explorer.Tours.Core.Domain.Tours;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Explorer.Tours.Tests.Integration.TourAuthoring
{
    [Collection("Sequential")]
    public class PublishingTourTests : BaseToursIntegrationTest
    {
        public PublishingTourTests(ToursTestFactory factory) : base(factory) { }

        [Theory]
        [InlineData(-1, -1, 200, TourStatus.Published)]
        [InlineData(-1, -4, 400, TourStatus.Draft)]
        [InlineData(-1, -5, 400, TourStatus.Draft)]
        [InlineData(-1, -6, 400, TourStatus.Draft)]
        [InlineData(-1, -7, 400, TourStatus.Draft)]
        [InlineData(-1, -8, 400, TourStatus.Draft)]
        [InlineData(-1, -9, 400, TourStatus.Draft)]
        [InlineData(-1, -10, 400, TourStatus.Draft)]
        [InlineData(-2, -3, 403, TourStatus.Archived)]
        public void Publishes(int authorId, int tourId, int expectedResponseCode, TourStatus expectedStatus)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope, authorId.ToString());
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            // Act
            var result = (ObjectResult)controller.Publish(tourId, authorId).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            //Assert - Database
            var storedEntity = dbContext.Tour.FirstOrDefault(t => t.Id == tourId);
            storedEntity.ShouldNotBeNull();
            storedEntity.Status.ShouldBe(expectedStatus);
        }

        private static TourController CreateController(IServiceScope scope, string userId)
        {
            return new TourController(scope.ServiceProvider.GetRequiredService<ITourService>())
            {
                ControllerContext = BuildContext(userId)
            };
        }
    }
}
