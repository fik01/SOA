using Explorer.API.Controllers.Author;
using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.Blog.Infrastructure.Database;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Tests.Integration
{
    [Collection("Sequential")]
    public class BundleCommandTests : BasePaymentsIntegrationTest
    {
        public BundleCommandTests(PaymentsTestFactory factory) : base(factory)
        {
        }

        [Theory]
        [MemberData(nameof(BundleCreateDtos))]
        public void Creation(BundleDto bundleDto, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            var result = (ObjectResult)controller.Create(bundleDto).Result;

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(expectedResponseCode);

            // Assert - Database

            if (result.StatusCode != 400)
            {
                var storedEntity = dbContext.Bundles.FirstOrDefault(t => t.Id == bundleDto.Id);
                storedEntity.ShouldNotBeNull();
            }
        }
        public static IEnumerable<object[]> BundleCreateDtos()
        {
                return new List<object[]>
                {                 
                    new object[]
                    {
                        new BundleDto{
                            Id=-9,
                            Name="bundle4",
                            Price=120,
                            AuthorId=-11,
                            ToursId=new List<int>{-13 },
                            BundleState=0
                        },
                        200
                    },
                    new object[]
                    {
                        new BundleDto{
                            Id=-10,
                            Name="bundle5",
                            Price=120,
                            AuthorId=0,
                            ToursId=new List<int>{-13 },
                            BundleState=1
                        },
                        400
                    }
                };
        }

        public static IEnumerable<object[]> BundleUpdateStatusDtos()
        {
            return new List<object[]>
                {
                    new object[]
                    {
                        new BundleDto{
                            Id=-2,
                            Name="bundle4",
                            Price=120,
                            AuthorId=-11,
                            ToursId=new List<int>{-13 },
                            BundleState=1
                        },
                        200
                    },
                    new object[]
                    {
                        new BundleDto{
                            Id=-2,
                            Name="bundle5",
                            Price=120,
                            AuthorId=0,
                            ToursId=new List<int>{-13 },
                            BundleState=2
                        },
                        404
                    }
                };
        }
        


        [Theory]
        [MemberData(nameof(BundleUpdateStatusDtos))]
        public void Update_bundle_status(BundleDto bundle, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            var result = (ObjectResult)controller.UpdateStatus(bundle).Result;

            if (result.StatusCode != 404)
            {
                var storedEntity = dbContext.Bundles.FirstOrDefault(t => t.Id == bundle.Id);
                storedEntity.ShouldNotBeNull();
            }
            else
            {
                result.ShouldNotBeNull();
                result.StatusCode.ShouldBe(expectedResponseCode);
            }
        }

        [Theory]
        [MemberData(nameof(BundleUpdateDtos))]
        public void Update_bundle(BundleDto bundle, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            var result = (ObjectResult)controller.Update(bundle).Result;

            if (result.StatusCode != 404)
            {
                var storedEntity = dbContext.Bundles.FirstOrDefault(t => t.Id == bundle.Id);
                storedEntity.ShouldNotBeNull();
            }
            else
            {
                result.ShouldNotBeNull();
                result.StatusCode.ShouldBe(expectedResponseCode);
            }
        }

        public static IEnumerable<object[]> BundleUpdateDtos()
        {
            return new List<object[]>
                {
                    new object[]
                    {
                        new BundleDto{
                            Id=-2,
                            Name="bundle8",
                            Price=120,
                            AuthorId=-11,
                            ToursId=new List<int>{-13 },
                            BundleState=0
                        },
                        200
                    },
                    new object[]
                    {
                        new BundleDto{
                            Id=-100,
                            Name="bundle5",
                            Price=120,
                            AuthorId=-11,
                            ToursId=new List<int>{-13 },
                            BundleState=1
                        },
                        404
                    }
                };
        }

        [Theory]
        [InlineData(-1, 200)]
        [InlineData(-101, 404)]
        public void Delete_bundle_fail(int bundleId, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            if (expectedResponseCode != 404)
            {
                var result = (OkResult)controller.Delete(bundleId);
                var storedEntity = dbContext.Bundles.FirstOrDefault(t => t.Id == bundleId);
                storedEntity.ShouldBeNull();
            }
            else
            {
                var result = (ObjectResult)controller.Delete(bundleId);
                result.ShouldNotBeNull();
                result.StatusCode.ShouldBe(expectedResponseCode);
            }
        }

        public static IEnumerable<object[]> BundleArchiveDtos()
        {
            return new List<object[]>
                {
                    new object[]
                    {
                        new BundleDto{
                            Id=-2,
                            Name="bundle8",
                            Price=120,
                            AuthorId=-11,
                            ToursId=new List<int>{-13 },
                            BundleState=2
                        },
                        400
                    },
                    new object[]
                    {
                        new BundleDto{
                            Id=-100,
                            Name="bundle5",
                            Price=120,
                            AuthorId=-11,
                            ToursId=new List<int>{-13 },
                            BundleState=2
                        },
                        404
                    }
                };
        }

        [Theory]
        [MemberData(nameof(BundleArchiveDtos))]
        public void Archive_bundle(BundleDto bundleDto, int expectedResponseCode)
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            //Assert - Response
            var result = (ObjectResult)controller.ArchiveBundle(bundleDto).Result;

            if (result.StatusCode != 404)
            {
                var storedEntity = dbContext.Bundles.FirstOrDefault(t => t.Id == bundleDto.Id);
                storedEntity.ShouldNotBeNull();
            }
            else
            {
                result.ShouldNotBeNull();
                result.StatusCode.ShouldBe(expectedResponseCode);
            }
        }

        private static BundleController CreateController(IServiceScope scope)
        {
            return new BundleController(scope.ServiceProvider.GetRequiredService<IBundleService>())
            {
                ControllerContext = BuildContext("-1")
            };
        }

    }
}
