using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Author.Authoring;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.API.Public.Authoring;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Tests.Integration.TourAuthoring
{
    [Collection("Sequential")]
    public class TourQueryTests : BaseToursIntegrationTest
    {
        public TourQueryTests(ToursTestFactory factory) : base(factory) { }
        
        //[Fact]
        //public void Retrieves_all()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);

        //    // Act
        //    var result = ((ObjectResult)controller.GetAll(0, 0).Result)?.Value as PagedResult<TourDto>;

        //    // Assert
        //    result.ShouldNotBeNull();
        //    result.Results.Count.ShouldBe(15);
        //    result.TotalCount.ShouldBe(15);
        //}

        //[Fact]
        //public void Retreives_all_by_authorId()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);

        //    // Act
        //    var result = ((ObjectResult)controller.GetAllByAuthorId(-1 ,0, 0).Result)?.Value as PagedResult<TourDto>;

        //    // Assert
        //    result.ShouldNotBeNull();
        //    result.Results.Count.ShouldBe(10);
        //    result.TotalCount.ShouldBe(10);
        //}

        //[Fact]
        //public void Retreives_one()
        //{
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateController(scope);

        //    // Act
        //    var result = ((ObjectResult)controller.Get(-1).Result)?.Value as TourDto;

        //    // Assert
        //    result.ShouldNotBeNull();
        //}


        //private static TourController CreateController(IServiceScope scope)
        //{
        //    return new TourController(scope.ServiceProvider.GetRequiredService<ITourService>())
        //    {
        //        ControllerContext = BuildContext("-1")
        //    };
        //}
    }

}
