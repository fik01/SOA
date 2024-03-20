using Explorer.API.Controllers.Tourist;
using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.Blog.Infrastructure.Database;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.Infrastructure.Database;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Linq;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.Tests.Integration
{
    [Collection("Sequential")]
    public class CommentCommandTests : BaseBlogIntegrationTest
    {
        public CommentCommandTests(BlogTestFactory factory) : base(factory)
        {
        }

        [Theory]
        [MemberData(nameof(CommentDtos))]
        public void Creation(CommentDto commentDto, int expectedResponseCode)
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            //var result = (ObjectResult)controller.Create(commentDto).Result;

            //Assert - Response
            //result.ShouldNotBeNull();
            //result.StatusCode.ShouldBe(expectedResponseCode);

            //Assert - Database
            /*if (result.StatusCode != 400)
            {
                var storedEntity = dbContext.Comments.FirstOrDefault(t => t.Id == commentDto.Id);
                storedEntity.ShouldNotBeNull();
            }*/
        }

        public static IEnumerable<object[]> CommentDtos()
        {
            return new List<object[]>
            {
                new object[]
                {
                    new CommentDto
                    {
                        Id = -4,
                        CreationDate = DateTime.UtcNow,
                        UserId = -11,
                        ProfilePic = new Uri("https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"),
                        Description = "opis -4 hihihiha",
                        LastEditDate = DateTime.UtcNow,
                        BlogId = -21
                    },
                    200
                }
            };
        }

        public static IEnumerable<object[]> CommentDtos2()
        {
            return new List<object[]>
            {
                new object[]
                {
                    new CommentDto
                    {
                        Id = -2,
                        CreationDate = DateTime.UtcNow,
                        UserId = -11,
                        ProfilePic = new Uri("https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"),
                        Description = "opis -4 hihihiha",
                        LastEditDate = DateTime.UtcNow,
                        BlogId = -21
                    },
                    200
                }
            };
        }

        [Theory]
        [MemberData(nameof(CommentDtos2))]
        public void Update_comment(CommentDto commentDto, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            /*var result = (ObjectResult)controller.UpdateComment(commentDto).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            // Assert - Database
            var storedEntity = dbContext.Comments.FirstOrDefault(t => t.Id == commentDto.Id);
            storedEntity.ShouldNotBeNull();*/
        }

        [Theory]
        [InlineData(-3, 200)]
        public void Delete_comment(int commentId, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            //var result = (OkResult)controller.DeleteComment(commentId);

            // Assert - Response
            //result.ShouldNotBeNull();
            //result.StatusCode.ShouldBe(expectedResponseCode);

            //Assert - Database
            var storedEntity = dbContext.Comments.FirstOrDefault(t => t.Id == commentId);
            storedEntity.ShouldBeNull();
        }

        [Theory]
        [InlineData(-5, 404)]
        public void Delete_comment_fail(int commentId, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            //var result = (ObjectResult)controller.DeleteComment(commentId);

            // Assert - Response
            //result.ShouldNotBeNull();
            //result.StatusCode.ShouldBe(expectedResponseCode);

            //Assert - Database
            var storedEntity = dbContext.Comments.FirstOrDefault(t => t.Id == commentId);
            storedEntity.ShouldBeNull();
        }

        [Theory]
        [InlineData(-2, 200)]
        public void Get_comment(int id, int expectedResponseCode)
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            var result = (ObjectResult)controller.GetComment(id).Result;

            //Assert-Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);
        }

        [Theory]
        [InlineData(-1000, 404)]
        public void Get_comment_failed(int id, int expectedResponseCode)
        {
            //Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            var result = (ObjectResult)controller.GetComment(id).Result;

            //Assert-Response
            result.StatusCode.ShouldBe(expectedResponseCode);
        }

        private static BlogController CreateController(IServiceScope scope)
        {
            return new BlogController(scope.ServiceProvider.GetRequiredService<IBlogService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
