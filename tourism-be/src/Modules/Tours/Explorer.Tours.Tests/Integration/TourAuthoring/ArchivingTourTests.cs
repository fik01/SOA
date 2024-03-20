using Explorer.API.Controllers.Author.Authoring;
using Explorer.Tours.API.Public.Authoring;
using Explorer.Tours.Core.Domain.Tours;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Explorer.Tours.Tests.Integration.TourAuthoring
{
    [Collection("Sequential")]
    public class ArchivingTourTests : BaseToursIntegrationTest
    {
        public ArchivingTourTests(ToursTestFactory factory) : base(factory) { }

        //[Theory]
        //[InlineData(-1, -11, 200, TourStatus.Archived)]
        //[InlineData(-1, -12, 400, TourStatus.Archived)]
        //[InlineData(-1, -2, 403, TourStatus.Published)]

        //public void Archives(int authorId, int tourId, int expectedResponseCode, TourStatus expectedStatus)
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope, authorId.ToString());
        //    var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

        //    // Act
        //    var result = (ObjectResult)controller.Archive(tourId, authorId).Result;

        //    // Assert - Response
        //    result.ShouldNotBeNull();
        //    result.StatusCode.ShouldBe(expectedResponseCode);

        //    //Assert - Database
        //    var storedEntity = dbContext.Tour.FirstOrDefault(t => t.Id == tourId);
        //    storedEntity.ShouldNotBeNull();
        //    storedEntity.Status.ShouldBe(expectedStatus);
        //}

        //private static TourController CreateController(IServiceScope scope, string userId)
        //{
        //    return new TourController(scope.ServiceProvider.GetRequiredService<ITourService>())
        //    {
        //        ControllerContext = BuildContext(userId)
        //    };
        //}
    }
}
