using Explorer.API.Controllers.Tourist;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Tests.Integration
{
    [Collection("Sequential")]
    public class TourRatingCommandTests : BaseToursIntegrationTest
    {
        public TourRatingCommandTests(ToursTestFactory factory) : base(factory) { }

        //[Fact]
        //public void Creates()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
        //    var newEntity = new TourRatingDto
        //    {
        //        PersonId = 1,
        //        TourId = 2,
        //        Mark = 4,
        //        Comment = "Bilo je odlicno",
        //        DateOfVisit = DateTime.UtcNow,
        //        DateOfCommenting = DateTime.UtcNow,
        //        Images = new List<Uri>()         
        //    };

        //    // Act
        //    var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as TourRatingDto;

        //    // Assert - Response
        //    result.ShouldNotBeNull();
        //    result.PersonId.ShouldNotBe(0);
        //    result.Comment.ShouldBe(newEntity.Comment);

        //    // Assert - Database
        //    var storedEntity = dbContext.TourRatings.FirstOrDefault(i => i.Comment == newEntity.Comment);
        //    storedEntity.ShouldNotBeNull();
        //}
        //[Fact]
        //public void CreateFailsInvalidData()
        //{
        //    //Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);
        //    var newEntity = new TourRatingDto()
        //    {
        //        Comment = "Test"
        //    };

        //    // Act
        //    var result = (ObjectResult)controller.Create(newEntity).Result;

        //    // Assert
        //    result.ShouldNotBeNull();
        //    result.StatusCode.ShouldBe(400);
        //}

        //private static TourRatingController CreateController(IServiceScope scope)
        //{
        //    return new TourRatingController(scope.ServiceProvider.GetRequiredService<ITourRatingService>())
        //    {
        //        ControllerContext = BuildContext("-1")
        //    };
        //}
    }
}
