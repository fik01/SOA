using Explorer.API.Controllers.Author;
using Explorer.BuildingBlocks.Tests;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;


namespace Explorer.Payments.Tests.Integration.Coupon;

[Collection("Sequential")]
public class CouponCommandTests : BasePaymentsIntegrationTest
{
    public CouponCommandTests(PaymentsTestFactory factory) : base(factory) { }

    [Fact]
    public void Creates()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        var dbContext = scope.ServiceProvider.GetRequiredService<PaymentsContext>();
        var newEntity = new CouponDto
        {
            Code = "7g7diDxt",
            Discount = 0.2,
            ExpirationDate = null,
            TourId = 1,
            AuthorId = 1
        };

        // Act
        var result = ((ObjectResult)controller.Create(newEntity).Result)?.Value as CouponDto;

        // Assert - Response
        result.ShouldNotBeNull();
        result.Id.ShouldNotBe(0);
        result.Code.ShouldBe(newEntity.Code);

        // Assert - Database
        var storedEntity = dbContext.Coupons.FirstOrDefault(i => i.Code == newEntity.Code);
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
        var updatedEntity = new CouponDto
        {
            Id = -1,
            Code = "96gDjde1",
            Discount = 0.1,
            ExpirationDate = null,
            TourId = 1,
            AuthorId = 1
        };

        // Act
        var result = ((ObjectResult)controller.Update(updatedEntity).Result)?.Value as CouponDto;

        // Assert - Response
        result.ShouldNotBeNull();
        result.Id.ShouldBe(-1);
        result.Code.ShouldBe(updatedEntity.Code);
        result.Discount.ShouldBe(updatedEntity.Discount);
        result.ExpirationDate.ShouldBe(updatedEntity.ExpirationDate);
        result.TourId.ShouldBe(updatedEntity.TourId);
        result.AuthorId.ShouldBe(updatedEntity.AuthorId);

        // Assert - Database
        var storedEntity = dbContext.Coupons.FirstOrDefault(i => i.Code == "96gDjde1");
        storedEntity.ShouldNotBeNull();
        storedEntity.Discount.ShouldBe(updatedEntity.Discount);
        var oldEntity = dbContext.Coupons.FirstOrDefault(i => i.Code == "Y333AK7Q");
        oldEntity.ShouldBeNull();
    }

    [Fact]
    public void Update_fails_invalid_id()
    {
        // Arrange
        using var scope = Factory.Services.CreateScope();
        var controller = CreateController(scope);
        var updatedEntity = new CouponDto
        {
            Id = -1000,
            Code = "4QDfjdcl"
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

        // Act
        var result = (OkResult)controller.Delete(-2);

        // Assert
        result.ShouldNotBeNull();
        result.StatusCode.ShouldBe(200);
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

    private static CouponController CreateController(IServiceScope scope)
    {
        return new CouponController(scope.ServiceProvider.GetRequiredService<ICouponService>())
        {
            ControllerContext = BuildContext("-1")
        };
    }
}