using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.API.Controllers.Tourist;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;


namespace Explorer.Stakeholders.Tests.Integration
{
    [Collection("Sequential")]
    public class ClubCommandTests : BaseStakeholdersIntegrationTest
    {
        public ClubCommandTests(StakeholdersTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Creates()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();
            var newEntity = new ClubDto
            {
                Name = "New Name Test.",
                Description = "New Description Test.",
                ClubPicture = new Uri("http://newUri.com"),
                TouristId = -24
            };

            //Act
            var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as ClubDto;

            //Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldNotBe(0);
            result.Name.ShouldBe(newEntity.Name);

            //Assert - Database
            var storedEntity = dbContext.Clubs.FirstOrDefault(i => i.Name == newEntity.Name);
            storedEntity.ShouldNotBeNull();
            storedEntity.Id.ShouldBe(result.Id);
        }

        [Fact]
        public void Create_fails_invalid_data()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var newEntity = new ClubDto()
            {
                Name = "Prvi test za Name - CreateFailsInvalidData metoda."
            };

            // Act
            var result = (ObjectResult)controller.Create(newEntity).Result;

            // Assert
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(400);
        }

        [Fact]
        public void Update()
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();
            var updatedEntity = new ClubDto
            {
                Id = -1,
                Name = "Prvi test za Name - Update metoda.",
                Description = "Prvi test za Description - Update metoda.",
                ClubPicture = new Uri("http://newUri.com"),
                TouristId = -21,
            };
          
            //Act
            var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as ClubDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldBe(-1);
            result.Name.ShouldBe(updatedEntity.Name);
            result.Description.ShouldBe(updatedEntity.Description);
            result.ClubPicture.ShouldBe(updatedEntity.ClubPicture);
            result.TouristId.ShouldBe(updatedEntity.TouristId);

            // Assert - Database
            var storedEntity = dbContext.Clubs.FirstOrDefault(i => i.Id == -1);
            storedEntity.ShouldNotBeNull();
            storedEntity.Description.ShouldBe(updatedEntity.Description);
            
        }

        [Fact]
        public void UpdateFailsInvalidValue()
        {
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var updatedEntity = new ClubDto
            {
                Id = -2,
                Name = ""
            };

            //Act
            var result = (ObjectResult)controller.Update(updatedEntity).Result;

            //Assert
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(400);
        }

        [Fact]
        public void UpdateFailInvalidId()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var updatedEntity = new ClubDto
            {
                Id = -1000,
                Name = "Prvi test za Name - UpdateFailInvalidId metoda",
                Description = "Prvi test za Description - UpdateFailInvalidId metoda",
                ClubPicture = new Uri("http://newUri.com"),
                TouristId = 1
               
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
            var result = (OkResult)controller.Delete(-1);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(200);

            // Assert - Database
            var storedCourse = dbContext.Clubs.FirstOrDefault(i => i.Id == -1);
            storedCourse.ShouldBeNull();
        }

        public void DeleteFailsInvalidId()
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

        private static ClubController CreateController(IServiceScope scope)
        {
            return new ClubController(scope.ServiceProvider.GetRequiredService<IClubService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
