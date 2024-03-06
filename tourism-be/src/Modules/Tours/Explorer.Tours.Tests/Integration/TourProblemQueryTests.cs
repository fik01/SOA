using Explorer.API.Controllers.Administrator;
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
public class TourProblemQueryTests : BaseToursIntegrationTest
{
    public TourProblemQueryTests(ToursTestFactory factory) : base(factory) { }

    

    [Fact]
    public void GiveDeadline()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        List<TourProblemMessageDto> messages = JsonConvert.DeserializeObject<List<TourProblemMessageDto>>(@"[
                {
                     
		            ""SenderId"": -8,
	  	            ""RecipientId"": -3,
		            ""CreationTime"": ""2023-11-11T17:03:36.2030688Z"",
		            ""Description"": ""Jos uvek nije moguce izvrsiti rezervaciju. "",
		            ""IsRead"": false
                }
            ]");

        TourProblemDto newTourProblem = new TourProblemDto()
        {
            Id = -3,
            TouristId = -6,
            TourId = -2,
            Category = API.Dtos.TourProblemCategory.BOOKING,
            Priority = API.Dtos.TourProblemPriority.LOW,
            Description = "Ne moze se rezervisati ova tura",
            Time = DateTime.Parse("2023-11-11T17: 03:36.2030688Z").ToUniversalTime(),
            IsSolved = false,
            Messages = messages,
            Deadline = DateTime.Parse("2024-11-20T17: 03:36.2030688Z").ToUniversalTime()
        };
        // Act
        var result = ((ObjectResult)controller.GiveDeadline(newTourProblem).Result)?.Value as TourProblemDto;

        // Assert
        result.ShouldNotBeNull();
        result.Deadline.ShouldBeGreaterThanOrEqualTo(newTourProblem.Deadline);
    }
    [Fact]
    public void PunishAuthor()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        List<TourProblemMessageDto> messages = JsonConvert.DeserializeObject<List<TourProblemMessageDto>>(@"[
                {
                     
		            ""SenderId"": -8,
	  	            ""RecipientId"": -3,
		            ""CreationTime"": ""2023-11-11T17:03:36.2030688Z"",
		            ""Description"": ""Jos uvek nije moguce izvrsiti rezervaciju. "",
		            ""IsRead"": false
                }
            ]");

        TourProblemDto newTourProblem = new TourProblemDto()
        {
            Id = -3,
            TouristId = -6,
            TourId = -2,
            Category = API.Dtos.TourProblemCategory.BOOKING,
            Priority = API.Dtos.TourProblemPriority.LOW,
            Description = "Ne moze se rezervisati ova tura",
            Time = DateTime.Parse("2023-11-11T17: 03:36.2030688Z").ToUniversalTime(),
            IsSolved = true,
            Messages = messages,
            Deadline = DateTime.Parse("2023-11-20T17: 03:36.2030688Z").ToUniversalTime()
        };
        // Act
        var result = ((ObjectResult)controller.PunishAuthor(newTourProblem).Result)?.Value as TourProblemDto;

        // Assert
        result.ShouldNotBeNull();
        result.IsSolved.ShouldBeTrue();
    }

    private static TourProblemController CreateController(IServiceScope scope)
    {
        return new TourProblemController(scope.ServiceProvider.GetRequiredService<ITourProblemService>())
        {
            ControllerContext = BuildContext("-1")
        };
    }
}
