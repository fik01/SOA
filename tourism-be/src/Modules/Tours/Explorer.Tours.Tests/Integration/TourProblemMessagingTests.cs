using Explorer.API.Controllers.Tourist;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Tests.Integration;

[Collection("Sequential")]
public class TourProblemMessagingTests : BaseToursIntegrationTest
{
    public TourProblemMessagingTests(ToursTestFactory factory) : base(factory) { }

    [Fact]
    public void RetrievesByTouristId()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);

        // Act
        var result = (ObjectResult)controller.GetByTouristId(-6).Result;

        // Assert
        result.ShouldNotBe(null);
        result.StatusCode.ShouldBe(200);
    }
    private static TourProblemController CreateController(IServiceScope scope)
    {
        return new TourProblemController(scope.ServiceProvider.GetRequiredService<ITourProblemService>())
        {
            ControllerContext = BuildContext("-1")
        };
    }
}
