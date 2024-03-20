using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Author.Authoring;
using Explorer.API.Controllers.Tourist;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.API.Public.Authoring;
using Explorer.Tours.Core.Domain.Tours;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.Tours.API.Public;

namespace Explorer.Tours.Tests.Integration.TourAuthoring
{
    [Collection("Sequential")]
    public class TourCommandTest : BaseToursIntegrationTest
    {

        public TourCommandTest(ToursTestFactory factory) : base(factory) { }

        //[Fact]
        //public void Creates()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateAuthorController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
        //    var newEntity = new TourDto
        //    {
        //        Name = "Tura 55",
        //        Description = "Jako lepa tura idemo.",
        //        Difficulty = 0,
        //        Tags = new List<string>() { "tag1", "tag2" },
        //        Status = 1,
        //        Price = 0,
        //        AuthorId = -1,
        //        Equipment = new int[] { -1, -3 },
        //        DistanceInKm = 2.5,
        //        ArchivedDate = null
        //    };

        //    // Act
        //    var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as TourDto;

        //    // Assert - Response
        //    result.ShouldNotBeNull();
        //    result.Id.ShouldNotBe(0);
        //    result.Name.ShouldBe(newEntity.Name);
        //    result.Description.ShouldBe(newEntity.Description);
        //    result.Difficulty.ShouldBe(newEntity.Difficulty);
        //    result.Tags.ShouldBe(newEntity.Tags);
        //    result.Status.ShouldBe(newEntity.Status);
        //    result.Price.ShouldBe(newEntity.Price);
        //    result.AuthorId.ShouldBe(newEntity.AuthorId);
        //    result.Equipment.ShouldBe(newEntity.Equipment);
        //    result.DistanceInKm.ShouldBe(newEntity.DistanceInKm);
        //    result.ArchivedDate.ShouldBe(newEntity.ArchivedDate);


        //    // Assert - Database
        //    var storedEntity = dbContext.Tour.FirstOrDefault(i => i.Name == newEntity.Name);
        //    storedEntity.ShouldNotBeNull();
        //    storedEntity.Id.ShouldBe(result.Id);
        //    storedEntity.Name.ShouldBe(result.Name);
        //    storedEntity.Description.ShouldBe(result.Description);
        //    ((int)storedEntity.Difficulty).ShouldBe(result.Difficulty);
        //    storedEntity.Tags.ShouldBe(result.Tags);
        //    ((int)storedEntity.Status).ShouldBe(result.Status);
        //    storedEntity.Price.ShouldBe(result.Price);
        //    storedEntity.AuthorId.ShouldBe(result.AuthorId);
        //    storedEntity.Equipment.ShouldBe(result.Equipment);
        //    storedEntity.DistanceInKm.ShouldBe(result.DistanceInKm);
        //    storedEntity.ArchivedDate.ShouldBe(result.ArchivedDate);
        //}

        //[Fact]
        //public void Updates()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateAuthorController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
        //    var updatedEntity = new TourDto
        //    {
        //        Id = -1,
        //        Name = "Tura 1",
        //        Description = "Ova tura je lepa",
        //        Difficulty = 0,
        //        Tags = new List<string>() { "tag2", "tag3" },
        //        Status = 2,
        //        Price = 0,
        //        AuthorId = -1,
        //        Equipment = new int[] { -1, -2 },
        //        DistanceInKm = 2.5,
        //        ArchivedDate = null
        //    };

        //    // Act
        //    var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as TourDto;

        //    // Assert - Response
        //    result.ShouldNotBeNull();
        //    result.Id.ShouldBe(-1);
        //    result.Name.ShouldBe(updatedEntity.Name);
        //    result.Description.ShouldBe(updatedEntity.Description);
        //    result.Difficulty.ShouldBe(updatedEntity.Difficulty);
        //    result.Tags.ShouldBe(updatedEntity.Tags);
        //    result.Status.ShouldBe(updatedEntity.Status);
        //    result.Price.ShouldBe(updatedEntity.Price);
        //    result.AuthorId.ShouldBe(updatedEntity.AuthorId);
        //    result.Equipment.ShouldBe(updatedEntity.Equipment);
        //    result.DistanceInKm.ShouldBe(updatedEntity.DistanceInKm);
        //    result.ArchivedDate.ShouldBe(updatedEntity.ArchivedDate);

        //    // Assert - Database
        //    var storedEntity = dbContext.Tour.FirstOrDefault(i => i.Status == TourStatus.Archived && i.Name == "Tura 1");
        //    storedEntity.ShouldNotBeNull();
        //    ((int)storedEntity.Status).ShouldBe(updatedEntity.Status);
        //    var oldEntity = dbContext.Tour.FirstOrDefault(i => i.Status == TourStatus.Published && i.Name == "Tura 1");
        //    oldEntity.ShouldBeNull();
        //}

        //[Fact]
        //public void Creates_Campaign()
        //{
        //    // Arrange
        //    using var scope = Factory.Services.CreateScope();
        //    var controller = CreateTouristController(scope);
        //    var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
        //    var campaignDto = new CampaignDto
        //    {
        //        Tours = new List<TourDto>()
        //        {
        //            new TourDto {
        //                Id = -5,
        //                Name = "Tura 5",
        //                Description = "",
        //                Difficulty = 3,
        //                Tags = new List<string>() { "tag", "tag2" },
        //                Status = 0,
        //                Price = 0,
        //                AuthorId = -1,
        //                Equipment = new int[] { -1, -3 },
        //                DistanceInKm = 2.5,
        //                ArchivedDate = null,
        //                PublishedDate = null,
        //                Durations = new List<TourDurationDto>()
        //            },
        //            new TourDto {
        //                Id = -6,
        //                Name = "Tura 6",
        //                Description = "Ova tura je super",
        //                Difficulty = 3,
        //                Tags = new List<string>() { "tag", "tag2" },
        //                Status = 0,
        //                Price = -1,
        //                AuthorId = -1,
        //                Equipment = new int[] { -1, -3 },
        //                DistanceInKm = 2.5,
        //                ArchivedDate = null,
        //                PublishedDate = null,
        //                Durations = new List<TourDurationDto>()
        //            }
        //        },
        //        Name = "Tura Najnovija",
        //        Description = "Jako lepa tura idemo.",
        //        TouristId = -6
        //    };

        //    // Act
        //    var result = ((ObjectResult)controller.CreateCampaign(campaignDto).Result)?.Value as TourDto;

        //    // Assert - Response
        //    result.ShouldNotBeNull();
        //    //result.Id.ShouldNotBe(0);
        //    result.Name.ShouldBe(campaignDto.Name);
        //    result.Description.ShouldBe(campaignDto.Description);
        //    result.Difficulty.ShouldBe(3);
        //    result.Tags.ShouldBe(new List<string>() { "tag", "tag2", "tag", "tag2" });
        //    result.Status.ShouldBe(0);
        //    result.Price.ShouldBe(0);
        //    result.AuthorId.ShouldBe(campaignDto.TouristId);
        //    result.Equipment.ShouldBe(new int[] { -1, -3 });
        //    result.DistanceInKm.ShouldBe(5.0);
        //    result.ArchivedDate.ShouldBe(null);
        //    result.PublishedDate.ShouldBe(null);


        //    // Assert - Database
        //    var storedEntity = dbContext.Tour.FirstOrDefault(i => i.Name == campaignDto.Name);
        //    storedEntity.ShouldNotBeNull();
        //    //storedEntity.Id.ShouldBe(result.Id);
        //    storedEntity.Name.ShouldBe(result.Name);
        //    storedEntity.Description.ShouldBe(result.Description);
        //    ((int)storedEntity.Difficulty).ShouldBe(result.Difficulty);
        //    storedEntity.Tags.ShouldBe(result.Tags);
        //    ((int)storedEntity.Status).ShouldBe(result.Status);
        //    storedEntity.Price.ShouldBe(result.Price);
        //    storedEntity.AuthorId.ShouldBe(result.AuthorId);
        //    storedEntity.Equipment.ShouldBe(result.Equipment);
        //    storedEntity.DistanceInKm.ShouldBe(result.DistanceInKm);
        //    storedEntity.ArchivedDate.ShouldBe(result.ArchivedDate);
        //    storedEntity.PublishedDate.ShouldBe(result.PublishedDate);
        //}

        //private static Explorer.API.Controllers.Author.Authoring.TourController CreateAuthorController(IServiceScope scope)
        //{
        //    return new Explorer.API.Controllers.Author.Authoring.TourController(scope.ServiceProvider.GetRequiredService<ITourService>())
        //    {
        //        ControllerContext = BuildContext("-1")
        //    };
        //}

        //private static Explorer.API.Controllers.Tourist.TourController CreateTouristController(IServiceScope scope)
        //{
        //    return new Explorer.API.Controllers.Tourist.TourController(scope.ServiceProvider.GetRequiredService<ITourService>(), scope.ServiceProvider.GetRequiredService<IRecommenderService>())
        //    {
        //        ControllerContext = BuildContext("-1")
        //    };
        //}

    }
}
