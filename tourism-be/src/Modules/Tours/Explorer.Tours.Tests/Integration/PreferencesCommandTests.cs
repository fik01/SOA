using Explorer.API.Controllers.Tourist;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Explorer.Stakeholders.Core.Domain;
using Shouldly;

namespace Explorer.Tours.Tests.Integration
{
    [Collection("Sequential")]
    public class PreferencesCommandTests : BaseToursIntegrationTest
    {
        public PreferencesCommandTests(ToursTestFactory factory) : base(factory) { }

        [Fact]
        public void Creates()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();
            var controller = CreateController(scope);
            var preferences = new PreferencesDto
            {
                Id = 3,
                UserId = -22,
                DifficultyLevel = 1,
                WalkingRate = 0,
                BicycleRate = 2,
                CarRate = 3,
                BoatRate = 1,
                Tags = new List<string> { "hiking", "boats" }
            };

            //Act
            var response = ((ObjectResult)controller.Create(preferences).Result)?.Value as PreferencesDto;

            //Assert - Response
            response.ShouldNotBeNull();
            response.Id.ShouldBe(3);


            //Assert - Database
            dbContext.ChangeTracker.Clear();
            var storedPreferences = dbContext.Preferences.FirstOrDefault(p => p.Id == preferences.Id);
            storedPreferences.ShouldNotBeNull();
            storedPreferences.UserId.ShouldBe(-22);
            storedPreferences.DifficultyLevel.ShouldBe(1);
            storedPreferences.WalkingRate.ShouldBe(0);
            storedPreferences.BicycleRate.ShouldBe(2);
            storedPreferences.CarRate.ShouldBe(3);
            storedPreferences.BoatRate.ShouldBe(1);
            storedPreferences.Tags.Count.ShouldBe(2);
        }

        [Fact]
        public void Create_fails_invalid_data()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var entity = new PreferencesDto
            {
                Id = 4,
                UserId = -22,
                DifficultyLevel = 1,
                WalkingRate = 0,
                BicycleRate = 2,
                CarRate = 6,
                BoatRate = 1,
                Tags = new List<string> { "hiking" }
            };

            // Act
            var result = (ObjectResult)controller.Create(entity).Result;

            // Assert
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(400);
        }

        [Fact]
        public void Deletes()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            // Act
            var result = (OkResult)controller.Delete(-1);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(200);

            // Assert - Database
            var stored = dbContext.Preferences.FirstOrDefault(i => i.Id == -1);
            stored.ShouldBeNull();
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

        private static PreferencesController CreateController(IServiceScope scope)
        {
            return new PreferencesController(scope.ServiceProvider.GetRequiredService<IPreferencesService>());
        }
    }
}
