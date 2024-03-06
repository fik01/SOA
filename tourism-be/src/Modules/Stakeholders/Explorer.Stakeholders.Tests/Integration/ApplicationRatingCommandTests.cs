using Explorer.API.Controllers.Administrator;
using Explorer.API.Controllers.Administrator.Administration;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Infrastructure.Database;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Tests.Integration;

[Collection("Sequential")]
public class ApplicationRatingCommandTests : BaseStakeholdersIntegrationTest
{
    public ApplicationRatingCommandTests(StakeholdersTestFactory factory) : base(factory)
    {
    }

    [Fact]
    public void Creates()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();
        var newEntity = new API.Dtos.ApplicationRatingDto
        {  
            Grade = 2,
            Comment = "Dodati comment",
            IssueDate = DateTime.UtcNow,
            UserId = 1
        };

        // Act
        var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as ApplicationRatingDto;

        // Assert - Response
        result.ShouldNotBeNull();
        result.Id.ShouldNotBe(0);
        result.Grade.ShouldBe(newEntity.Grade);
        result.Comment.ShouldBe(newEntity.Comment);
        result.UserId.ShouldBe(newEntity.UserId);

        // Assert - Database
        var storedEntity = dbContext.ApplicationRatings.FirstOrDefault(i => i.Id == result.Id);
        storedEntity.ShouldNotBeNull();
        storedEntity.Id.ShouldBe(result.Id);
    }

    [Fact]
    public void Create_fails_invalid_data()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        var updatedEntity = new ApplicationRatingDto
        {
            Comment = "Dodati comment",
            Grade = 12
           
        };

        // Act
        var result = (ObjectResult)controller.Create(updatedEntity).Result;

        // Assert
        result.ShouldNotBeNull();
        result.StatusCode.ShouldBe(400);
    }

    [Fact]
    public void Updates()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();
        var updatedEntity = new ApplicationRatingDto
        {
            Id = -1,
            Comment = "neki novi com",
            Grade = 5,
            UserId = 1,
            IssueDate = DateTime.UtcNow
        };

        // Act
        var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as ApplicationRatingDto;

        // Assert - Response
        result.ShouldNotBeNull();
        result.Id.ShouldBe(-1);
        result.IssueDate.ShouldBe(updatedEntity.IssueDate);
        result.Grade.ShouldBe(updatedEntity.Grade);
        result.UserId.ShouldBe(updatedEntity.UserId);
        result.Comment.ShouldBe(updatedEntity.Comment);

        // Assert - Database
        var storedEntity = dbContext.ApplicationRatings.FirstOrDefault(i => i.Id == -1);
        storedEntity.ShouldNotBeNull();
        storedEntity.Grade.ShouldBe(updatedEntity.Grade);
        storedEntity.Comment.ShouldBe(updatedEntity.Comment);
        var oldEntity = dbContext.ApplicationRatings.FirstOrDefault(i => i.Comment == "Neki kom1");
        oldEntity.ShouldBeNull();
    }

    [Fact]
    public void Update_fails_invalid_id()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        var updatedEntity = new ApplicationRatingDto
        {
            Id = -1000,
            Comment = "neki novi com",
            Grade = 5,
            UserId = 1,
            IssueDate = DateTime.UtcNow
        };

        // Act
        var result = (ObjectResult)controller.Update(updatedEntity).Result;

        // Assert
        result.ShouldNotBeNull();
        result.StatusCode.ShouldBe(404);
    }

    [Fact]
    public void Deletes()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();

        // Act
        var result = (OkResult)controller.Delete(-2);

        // Assert - Response
        result.ShouldNotBeNull();
        result.StatusCode.ShouldBe(200);

        // Assert - Database
        var storedCourse = dbContext.ApplicationRatings.FirstOrDefault(i => i.Id == 2);
        storedCourse.ShouldBeNull();
    }

    [Fact]
    public void Delete_fails_invalid_id()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);

        // Act
        var result = (ObjectResult)controller.Delete(-1000);

        // Assert
        result.ShouldNotBeNull();
        result.StatusCode.ShouldBe(404);
    }

    private static ApplicationRatingController CreateController(IServiceScope scope)
    {
        return new ApplicationRatingController(scope.ServiceProvider.GetRequiredService<IApplicationRatingService>())
        {
            ControllerContext = BuildContext("-1")
        };
    }
}

