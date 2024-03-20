using Explorer.API.Controllers.Administrator.Administration;
using Explorer.API.Controllers.Tourist;
using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.Blog.Infrastructure.Database;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Infrastructure.Database;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.Tests.Integration
{
    [Collection("Sequential")]
    public class BlogCreationTests : BaseBlogIntegrationTest
    {
        public BlogCreationTests(BlogTestFactory factory) : base(factory) { }


        [Theory]
        [MemberData(nameof(BlogDtos))]
        public void Creation(BlogDto blogDto, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();
            
            /*var result = (ObjectResult)controller.Create(blogDto).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            // Assert - Database
            if (result.StatusCode != 400)
            {
                var storedEntity = dbContext.Blogs.FirstOrDefault(t => t.Id == blogDto.Id);
                storedEntity.ShouldNotBeNull();
            }*/
            
            
        }
        public static IEnumerable<object[]> BlogDtos()
        {
            return new List<object[]>
        {
            new object[]
            {
                new BlogDto(-5,"haha","hihi",0,-11,"",0,new List<RatingDto>()),
                200
            },
            new object[]
            {
                new BlogDto(-6,"huuuuuuaha","hihi",0,-21,"",0,new List<RatingDto>()),
                200
            },
            /*new object[]
            {
                new BlogDto(-7,"huuuuuuaha","hihi",0,-21,"",0,new List<RatingDto>()),
                23505
            },*/
            new object[]
            {
                new BlogDto{
                    Description="ahha",
                    Id=-9,
                    Status=0,
                    Ratings=new List<RatingDto>(),
                    RatingSum=0,
                    UserId=-11,
                    Username=""
                },
                400
            }
        };
        }
        [Theory]
        [InlineData(-21,-21,1, 200)]
        [InlineData(-21, -21, -1, 200)]
        [InlineData(-22, -21, -1, 200)]
        public void UpdateRating(int userId,int blogId,int value, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            var result = (ObjectResult)controller.UpdateRating(blogId,userId,value).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            // Assert - Database
            var storedEntity = dbContext.Blogs.FirstOrDefault(t => t.Id == blogId);
            var rating = storedEntity.Ratings.FirstOrDefault(t => t.UserId == userId);
            rating.ShouldNotBeNull();

        }
        [Theory]
        [InlineData(-21, -21, 200)]
        [InlineData(-22, -21, 200)]
        public void DeleteRating(int userId, int blogId, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            var result = (OkResult)controller.DeleteRating(blogId, userId);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            // Assert - Database
            var storedEntity = dbContext.Blogs.FirstOrDefault(t => t.Id == blogId);
            var rating = storedEntity.Ratings.FirstOrDefault(t => t.UserId == userId);
            rating.ShouldBeNull();

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
