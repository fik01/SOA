using Explorer.API.Controllers.Author;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Tests.Integration.People
{
    [Collection("Sequential")]
    public class AuthorCommandTests : BaseStakeholdersIntegrationTest
    {
        public AuthorCommandTests(StakeholdersTestFactory factory) : base(factory) { }

        [Fact]
        public void Updates()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();
            var updatedEntity = new PersonDto
            {
                Id = -11,
                UserId = -11,
                Name = "Anaaaaaaaaaa",
                Surname = "Aniiiiiiić",
                Email = "turista1@gmail.com",
                ProfilePic = new Uri("https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png", UriKind.Absolute),
                Biography = "biography",
                Motto = "motto",
                Latitude = 49.32141,
                Longitude = 19.89212
            };

            // Act
            var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as PersonDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldBe(-11);
            result.Name.ShouldBe(updatedEntity.Name);
            result.Surname.ShouldBe(updatedEntity.Surname);

            // Assert - Database
            var storedEntity = dbContext.People.FirstOrDefault(i => i.Id == -11);
            storedEntity.ShouldNotBeNull();
            storedEntity.Name.ShouldBe(updatedEntity.Name);
            storedEntity.Surname.ShouldBe(updatedEntity.Surname);
            var oldEntity = dbContext.People.FirstOrDefault(i => i.Id == -11
                                                            && i.Name == "Ana"
                                                            && i.Surname == "Anić");
            oldEntity.ShouldBeNull();
        }

        [Fact]
        public void Update_fails_invalid_id()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var updatedEntity = new PersonDto
            {
                Id = -100000,
                UserId = -11,
                Name = "Person",
                Surname = "Person",
                Email = "person@gmail.com",
                ProfilePic = new Uri("https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png", UriKind.Absolute),
                Biography = "biography",
                Motto = "motto",
                Latitude = 49.32141,
                Longitude = 19.89212
            };

            // Act
            var result = (ObjectResult)controller.Update(updatedEntity).Result;

            // Assert
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(404);
        }

        private static PersonController CreateController(IServiceScope scope)
        {
            return new PersonController(scope.ServiceProvider.GetRequiredService<IPersonService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
