using Explorer.API.Controllers.Tourist;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Explorer.Tours.Tests.Integration.Facility
{
    public class FacilityCommandTests : BaseToursIntegrationTest
    {
        public FacilityCommandTests(ToursTestFactory factory) : base(factory) { }

        [Fact]
        public void Creates()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
            var newEntity = new FacilityDto
            {
                Name = "Restoran",
                Description = "Hrana",
                Image = new Uri("https://media-cdn.tripadvisor.com/media/photo-s/1a/08/f9/d7/terasa.jpg"),
                Category = 1,
                Latitude = 14.5243,
                Longitude = 87.4536
            };

            // Act
            var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as FacilityDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldNotBe(0);
            result.Name.ShouldBe(newEntity.Name);
            result.Description.ShouldBe(newEntity.Description);
            result.Image.ShouldBe(newEntity.Image);
            result.Category.ShouldBe(newEntity.Category);
            result.Latitude.ShouldBe(newEntity.Latitude);
            result.Longitude.ShouldBe(newEntity.Longitude);

            // Assert - Database
            var storedEntity = dbContext.Facilities.FirstOrDefault(i => i.Name == newEntity.Name);
            storedEntity.ShouldNotBeNull();
            storedEntity.Id.ShouldBe(result.Id);
            storedEntity.Name.ShouldBe(result.Name);
            storedEntity.Description.ShouldBe(result.Description);
            storedEntity.Image.ShouldBe(result.Image);
            ((int)storedEntity.Category).ShouldBe(result.Category);
            storedEntity.Latitude.ShouldBe(result.Latitude);
            storedEntity.Longitude.ShouldBe(result.Longitude);
        }

        [Fact]
        public void Create_fails_invalid_data()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var updatedEntity = new FacilityDto
            {
                Description = "Test"
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
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
            var updatedEntity = new FacilityDto
            {
                Id = -1,
                Name = "Restoran Kod Bake",
                Description = "Hrana",
                Image = new Uri("https://hypetv.rs/wp-content/uploads/2022/12/baka-prase.jpeg"),
                Category = 1,
                Latitude = 52.4324,
                Longitude = 52.4123
            };

            // Act
            var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as FacilityDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldBe(-1);
            result.Name.ShouldBe(updatedEntity.Name);
            result.Description.ShouldBe(updatedEntity.Description);
            result.Image.ShouldBe(updatedEntity.Image);
            result.Category.ShouldBe(updatedEntity.Category);
            result.Latitude.ShouldBe(updatedEntity.Latitude);
            result.Longitude.ShouldBe(updatedEntity.Longitude);

            // Assert - Database
            var storedEntity = dbContext.Facilities.FirstOrDefault(i => i.Description == "Hrana");
            storedEntity.ShouldNotBeNull();
            storedEntity.Description.ShouldBe(updatedEntity.Description);
            var oldEntity = dbContext.Facilities.FirstOrDefault(i => i.Description == "Palacinkarina");
            oldEntity.ShouldBeNull();
        }

        [Fact]
        public void Update_fails_invalid_id()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var updatedEntity = new FacilityDto
            {
                Id = -1000,
                Name = "Test",
                Description = "Test",
                Image = new Uri("https://example.com/"),
                Category = 1,
                Latitude = 0,
                Longitude = 0
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
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            // Act
            var result = (OkResult)controller.Delete(-3);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(200);

            // Assert - Database
            var storedCourse = dbContext.Facilities.FirstOrDefault(i => i.Id == -3);
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

        private static FacilityController CreateController(IServiceScope scope)
        {
            return new FacilityController(scope.ServiceProvider.GetRequiredService<IFacilityService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
