using Explorer.API.Controllers.Author.Authoring;
using Explorer.Tours.API.Dtos.Statistics;
using Explorer.Tours.API.Public.Execution;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Tests.Integration.TourAuthoring
{
    [Collection("Sequential")]
    public class TourSessionStatisticsQueryTest : BaseToursIntegrationTest
    {
        public TourSessionStatisticsQueryTest(ToursTestFactory factory) : base(factory)
        { 
            
        }

        [Fact]
        public void Get_most_attended_tours_stats()
        {
            // Arange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetAttendanceStatistics().Result).Value as List<TourStatisticsDto>;

            // Assert
            result.ShouldNotBeNull();
        }

        [Fact]
        public void Get_most_abandoned_tours_stats()
        {
            // Arange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetAbandonedStatistics().Result)?.Value as List<TourStatisticsDto>;

            // Assert
            result.ShouldNotBeNull();
        }

        [Theory]
        [InlineData(-1)]
        public void Get_number_of_started_tours(int authorId)
        {
            // Arange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetNumberOfStartedTours(authorId).Result)?.Value as int?;

            // Assert
            result.ShouldBe(2);
        }

        [Theory]
        [InlineData(-1)]
        public void Get_number_of_completed_tours(int authorId)
        {
            // Arange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetNumberOfCompletedTours(authorId).Result)?.Value as int?;

            // Assert
            result.ShouldBe(0);
        }

        [Theory]
        [InlineData(-1)]
        public void Get_tour_completion_percentage_stats(int authorId)
        {
            // Arange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            // Act
            var result = ((ObjectResult)controller.GetTourCompletionPercentageStats(authorId).Result)?.Value as List<int>;

            // Assert
            result.ShouldBe(new List<int> { 0, 2, 0, 0 });
        }

        private static SessionController CreateController(IServiceScope scope)
        {
            return new SessionController(scope.ServiceProvider.GetRequiredService<ISessionService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }
    }
}
