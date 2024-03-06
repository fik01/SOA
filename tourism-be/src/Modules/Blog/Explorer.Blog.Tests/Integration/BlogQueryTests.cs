using Explorer.API.Controllers.Author;
using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.Blog.Infrastructure.Database;
using Explorer.BuildingBlocks.Core.UseCases;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Explorer.Blog.Tests.Integration
{
    [Collection("Sequential")]
    public class BlogQueryTests : BaseBlogIntegrationTest
    {
        public BlogQueryTests(BlogTestFactory factory) : base(factory)
        {
        }
        
        [Fact]
        public void Retrieves_all()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetAll().Result)?.Value as List<BlogDto>;

            // Assert
            result.ShouldNotBeNull();
            result.Count.ShouldBe(5);
            result[0].Username.ShouldBe("turista1@gmail.com");
        }
        
        [Theory]
        [InlineData( -21, 200)]
        [InlineData( -1000, 404)]
        public void GetBlog(int id, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            var result = (ObjectResult)controller.Get(id).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

        }

        [Theory]
        [InlineData(0, 200)]
        [InlineData(2, 200)]
        public void GetBlogsByStatus(int state, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            var result = (ObjectResult)controller.GetBlogsByStatus(state).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);
            
            if(state==0)(result.Value as List<BlogDto>).Count.ShouldBe(1);
            else if(state==2) (result.Value as List<BlogDto>).Count.ShouldBe(2);

        }

        [Theory]
        [InlineData(-21, 200)]
        [InlineData(-22, 200)]
        public void GetBlogsByAuthor(int authorId, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<BlogContext>();

            var result = (ObjectResult)controller.GetBlogsByAuthor(authorId).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            if (authorId == -21) (result.Value as List<BlogDto>).Count.ShouldBe(3);
            else if (authorId == -22) (result.Value as List<BlogDto>).Count.ShouldBe(2);

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
