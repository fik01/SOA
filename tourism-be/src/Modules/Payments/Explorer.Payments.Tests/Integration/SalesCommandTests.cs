using System;
using System.Collections.Generic;
using System.Linq;
using Explorer.API.Controllers.Author;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.UseCases;
using Explorer.Payments.Infrastructure.Database;
using FluentResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using Xunit;

namespace Explorer.Payments.Tests.Integration
{
    [Collection("Sequential")]
    public class SalesCommandTests : BasePaymentsIntegrationTest
    {
        public SalesCommandTests(PaymentsTestFactory factory) : base(factory)
        {
        }

        [Fact]
        public void Creates()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            var newEntity = new SalesDto
            {
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(14),
                DiscountPercentage = 10,
            };

            // Act
            var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as SalesDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldNotBe(0);
            result.StartDate.ShouldBe(newEntity.StartDate);
            result.EndDate.ShouldBe(newEntity.EndDate);
            result.DiscountPercentage.ShouldBe(newEntity.DiscountPercentage);        

            // Assert - Database
            var storedEntity = dbContext.Sales.FirstOrDefault(i => i.Id == result.Id);
            storedEntity.ShouldNotBeNull();
            storedEntity.Id.ShouldBe(result.Id);
        }

        [Fact]
        public void Updates()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            var updatedEntity = new SalesDto
            {
                Id = -1,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(14),
                DiscountPercentage = 15,         
            };

            // Act
            var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as SalesDto;

            // Assert - Response
            result.ShouldNotBeNull();
            result.Id.ShouldBe(-1);
            result.StartDate.ShouldBe(updatedEntity.StartDate);
            result.EndDate.ShouldBe(updatedEntity.EndDate);
            result.DiscountPercentage.ShouldBe(updatedEntity.DiscountPercentage);
            
            // Assert - Database
            var storedEntity = dbContext.Sales.FirstOrDefault(i => i.Id == -1);
            storedEntity.ShouldNotBeNull();
            storedEntity.DiscountPercentage.ShouldBe(updatedEntity.DiscountPercentage);
        }

        [Fact]
        public void Update_fails_invalid_id()
        {
            // Arrange
            using var scope = Factory.Services.CreateScope();
            var controller = CreateController(scope);

            var updatedEntity = new SalesDto
            {
                Id = -1000,
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(14),
                DiscountPercentage = 20,         
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
            var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();

            // Act
            var result = (OkResult)controller.Delete(-2);

            // Assert - Response
            result.ShouldNotBeNull();
            result.StatusCode.ShouldBe(200);

            // Assert - Database
            var storedEntity = dbContext.Sales.FirstOrDefault(i => i.Id == -2);
            storedEntity.ShouldBeNull();
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

         private static SalesController CreateController(IServiceScope scope)
         { 
            return new SalesController(scope.ServiceProvider.GetRequiredService<ISalesService>())
            {
                ControllerContext = BuildContext("-1")
            };
         }
    }
}
