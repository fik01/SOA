using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Author;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Explorer.Tours.Tests.Integration
{
    [Collection("Sequential")]
    public class TourKeyPointQueryTests : BaseToursIntegrationTest
    {
        public TourKeyPointQueryTests(ToursTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void RetrievesAll()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.GetAll(0, 0).Result)?.Value as PagedResult<TourKeyPointDto>;

            //Assert
            result.ShouldNotBe(null);
            result.Results.Count.ShouldBe(16);
            result.TotalCount.ShouldBe(16);
        }

        [Fact]
        public void RetrievesAllPublic()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.GetAllPublic(0, 0).Result)?.Value as PagedResult<PublicTourKeyPointDto>;

            //Assert
            result.ShouldNotBe(null);
            result.Results.Count.ShouldBe(2);
            result.TotalCount.ShouldBe(2);
        }

        [Fact]
        public void RetrievesOne()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.Get(-1).Result);

            //Assert
            result.ShouldNotBe(null);
            result.StatusCode.ShouldBe(200);
        }

        [Fact]
        public void RetrievesByStatus()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.GetByStatus("Pending").Result);

            //Assert
            result.ShouldNotBe(null);
            result.StatusCode.ShouldBe(200);
        }
        [Fact]
        public void RetrievesOneFailedInvalidId()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            //Act
            var result = ((ObjectResult)controller.Get(-1000).Result);

            //Assert
            result.StatusCode.ShouldBe(404);
        }

        [Fact]
        public void Update()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Create a DTO with updated data
            var updatedData = new TourKeyPointDto
            {
                Id = -3,
                Name = "Updated Name",
                Description = "Updated Description",
                Image = new Uri("http://newUri.com"),
                Longitude = 22.5,
                Latitude = 7,
                /*TourId = -2*/
            };

            // Act
            var result = ((ObjectResult)controller.Update(updatedData).Result);

            // Assert
            result.ShouldNotBe(null);
            result.StatusCode.ShouldBe(200);
        }
        [Fact]
        public void ChangeStatus()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.ChangeStatus(-5, "Approved").Result);

            // Assert
            result.ShouldNotBe(null);
            result.StatusCode.ShouldBe(200);
        }
        [Fact]
        public void UpdateFailInvalidId()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Create a DTO with updated data
            var updatedData = new TourKeyPointDto
            {
                Id = -3000,
                Name = "Updated Name",
                Description = "Updated Description",
                Image = new Uri("http://newUri.com"),
                Longitude = 22.5,
                Latitude = 7,
                TourId = -2
            };

            // Act
            var result = ((ObjectResult)controller.Update(updatedData).Result);

            // Assert
            result.StatusCode.ShouldBe(404);
        }
        [Fact]
        public void UpdateFailIvalidData()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Create a DTO with updated data
            var updatedData = new TourKeyPointDto
            {
                Id = -3,
                Name = "",
                Description = "Updated Description",
                Image = new Uri("http://newUri.com"),
                Longitude = 22.5,
                Latitude = 7,
                TourId = 17
            };

            // Act
            var result = ((ObjectResult)controller.Update(updatedData).Result);

            // Assert
            result.StatusCode.ShouldBe(400);
        }
        private static Explorer.API.Controllers.Author.TourKeyPointController CreateController(IServiceScope scope)
        {
            return new Explorer.API.Controllers.Author.TourKeyPointController(scope.ServiceProvider.GetRequiredService<ITourKeyPointService>(), scope.ServiceProvider.GetRequiredService<IPublicTourKeyPointService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
