using Explorer.Blog.API.Dtos;
using Explorer.Blog.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.API.Controllers.Tourist;
using Explorer.Tours.API.Dtos.TouristTour;
using Explorer.Blog.API.Public;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Authoring;
using Explorer.Tours.API.Public.TouristTour;
using Explorer.Tours.Infrastructure.Database;
using Shouldly;
using Explorer.Tours.Core.Domain.Tours;

namespace Explorer.Tours.Tests.Integration.TourAuthoring
{
    [Collection("Sequential")]
    public class TouristTourCommandTest : BaseToursIntegrationTest
    {
        public TouristTourCommandTest(ToursTestFactory factory) : base(factory)
        {

        }

        private static TouristTourController CreateController(IServiceScope scope)
        {
            return new TouristTourController(scope.ServiceProvider.GetRequiredService<ITourService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }

        public static IEnumerable<object[]> TourData()
        {
            var tourData = new List<object[]>
    {
        new object[]
        {
            new TourDto
            {
                Id = -117,
                Name = "Nova turaaaa",
                AuthorId = -1,
                Description = "OpisTure",
                DistanceInKm = 60,
                Status =3,
                Durations = new List<TourDurationDto>
                {
                    new TourDurationDto
                    {
                        TimeInSeconds = 124124,
                        Transportation = 0
                    }
                },
                KeyPoints = new List<TourKeyPointDto>
                {
                    new TourKeyPointDto
                    {
                        Id = -3329,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke",
                        PositionInTour = 1,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3330,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 2",
                        PositionInTour = 2,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3331,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 3",
                        PositionInTour = 3,
                    }
                }
            },
            200
        },

        new object[]
        {
            new TourDto
            {
                Id = -118,
                Name = "Invalid Tour",
                AuthorId = -1,
                Description = "Invalid Tour Description",
                DistanceInKm = 50,
                Status = 3,
                Durations = new List<TourDurationDto>
                {
                },
                KeyPoints = new List<TourKeyPointDto>
                {
                    new TourKeyPointDto
                    {
                        Id = -3340,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Invalid Key Point",
                        Image = new Uri("http://invalid.com/"),
                        Name = "Invalid Point",
                        PositionInTour = 1,
                    }
                }
            },
            400
        },

        new object[]
        {
            new TourDto
            {
                Id = -119,
                Name = "",
                AuthorId = -1,
                Description = "Tour Description",
                DistanceInKm = 70,
                Status = 3,
                Durations = new List<TourDurationDto>(),
                KeyPoints = new List<TourKeyPointDto>
                {
                    new TourKeyPointDto
                    {
                        Id = -3350,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Key Point 1",
                        Image = new Uri("http://point1.com/"),
                        Name = "Point 1",
                        PositionInTour = 1,
                    }
                }
            },
            400
        }
    };

            return tourData;
        }


        [Theory]
        [MemberData(nameof(TourData))]
        public void Creation(TourDto tourDto, int expectedResponseCode)
        {


            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (ObjectResult)controller.Create(tourDto).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            // Assert - Database
            if (result.StatusCode != 400)
            {
                var storedEntity = dbContext.Tour.FirstOrDefault(t => t.Id == tourDto.Id);
                storedEntity.ShouldNotBeNull();
            }


        }



        public static IEnumerable<object[]> TourDataUpdate()
        {
            var tourData = new List<object[]>
    {
        new object[]
        {
            new TourDto
            {
                Id = -14,
                Name = "Nova turaaaa",
                AuthorId = -1,
                Description = "OpisTure",
                DistanceInKm = 60,
                Status =3,
                Durations = new List<TourDurationDto>
                {
                    new TourDurationDto
                    {
                        TimeInSeconds = 124124,
                        Transportation = 0
                    }
                },
                KeyPoints = new List<TourKeyPointDto>
                {
                    new TourKeyPointDto
                    {
                        Id = -3329,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke",
                        PositionInTour = 1,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3330,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 2",
                        PositionInTour = 2,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3331,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 3",
                        PositionInTour = 3,
                    }
                }
            },
            200
        },
        new object[]
        {
            new TourDto
            {
                Id = -14,
                Name = "",
                AuthorId = -1,
                Description = "OpisTure",
                DistanceInKm = 60,
                Status =3,
                Durations = new List<TourDurationDto>
                {
                    new TourDurationDto
                    {
                        TimeInSeconds = 124124,
                        Transportation = 0
                    }
                },
                KeyPoints = new List<TourKeyPointDto>
                {
                    new TourKeyPointDto
                    {
                        Id = -3329,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke",
                        PositionInTour = 1,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3330,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 2",
                        PositionInTour = 2,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3331,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 3",
                        PositionInTour = 3,
                    }
                }
            },
            400
        },
        new object[]
        {
            new TourDto
            {
                Id = -14,
                Name = "Nova turaaaa",
                AuthorId = -1,
                Description = "OpisTure",
                DistanceInKm = 60,
                Status =3,
                Durations = new List<TourDurationDto>
                {
                },
                KeyPoints = new List<TourKeyPointDto>
                {
                    new TourKeyPointDto
                    {
                        Id = -3329,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke",
                        PositionInTour = 1,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3330,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 2",
                        PositionInTour = 2,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3331,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 3",
                        PositionInTour = 3,
                    }
                }
            },
            400
        },
        new object[]
        {
            new TourDto
            {
                Id = -31214,
                Name = "Nova turaaaa",
                AuthorId = -1,
                Description = "OpisTure",
                DistanceInKm = 60,
                Status =3,
                Durations = new List<TourDurationDto>
                {
                    new TourDurationDto
                    {
                        TimeInSeconds = 124124,
                        Transportation = 0
                    }
                },
                KeyPoints = new List<TourKeyPointDto>
                {
                    new TourKeyPointDto
                    {
                        Id = -3329,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke",
                        PositionInTour = 1,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3330,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 2",
                        PositionInTour = 2,
                    },
                    new TourKeyPointDto
                    {
                        Id = -3331,
                        Latitude = 0,
                        Longitude = 0,
                        Description = "Opis tacke",
                        Image = new Uri("http://tacka1.com/"),
                        Name = "Ime tacke 3",
                        PositionInTour = 3,
                    }
                }
            },
            404
        }


    };

            return tourData;
        }

        [Theory]
        [MemberData(nameof(TourDataUpdate))]
        public void Update(TourDto tourDto, int expectedResponseCode)
        {


            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (ObjectResult)controller.Update(tourDto).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);



        }
        [Fact]
        public void Delete()
        {


            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (OkResult)controller.Delete(-15);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(200);



        }

        [Fact]
        public void DeleteNotFound()
        {


            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<ToursContext>();

            var result = (ObjectResult)controller.Delete(-11312);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(404);



        }



    }
}
