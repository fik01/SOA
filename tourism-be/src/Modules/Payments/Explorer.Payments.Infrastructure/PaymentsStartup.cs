using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Payments.API.Internal;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.DomainEvents;
using Explorer.Payments.Core.Domain.DomainServices;
using Explorer.Payments.Core.Domain.DomainServicesInterface;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using Explorer.Payments.Core.Domain.ServiceInterfaces;
using Explorer.Payments.Core.Mappers;
using Explorer.Payments.Core.UseCases;
using Explorer.Payments.Infrastructure.Database;
using Explorer.Payments.Infrastructure.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Infrastructure
{
    public static class PaymentsStartup
    {
        public static IServiceCollection ConfigurePaymentsModule(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(PaymentsProfile).Assembly);
            SetupCore(services);
            SetupInfrastructure(services);
            return services;
        }

        private static void SetupCore(IServiceCollection services)
        {
            services.AddScoped<IBoughtItemService, BoughtItemService>();
            services.AddScoped<IBundleService, BundleService>();
            services.AddScoped<IPaymentRecordService, PaymentRecordService>();
            services.AddScoped<ISalesService, SalesService>();
            services.AddScoped<ICouponService, CouponService>();
            services.AddScoped<IWalletService, WalletService>();
            services.AddScoped<ITourBoughtService, TourBoughtService>();
            services.AddScoped<ICouponUsedService, CouponUsedService>();
            services.AddScoped<IShoppingEventService, ShoppingEventService>();
            services.AddScoped<IInternalBoughtItemService, InternalBoughtItemService>();
            services.AddScoped<ITourStatisticsDomainService, TourStatisticsDomainService>();

            services.AddScoped<IAuthorEarningsService, AuthorEarningsService>();
            services.AddScoped<IBoughtItemDomainService, BoughtItemDomainService>();
            services.AddScoped<IAuthorEarningsDomainService, AuthorEarningsDomainService>();
        }

        private static void SetupInfrastructure(IServiceCollection services)
        {
            services.AddScoped<IBoughtItemRepository, BoughtItemDatabaseRepository>();
            services.AddScoped(typeof(ICrudRepository<Bundle>), typeof(CrudDatabaseRepository<Bundle, PaymentsContext>));
            services.AddScoped<IBundleRepository, BundleRepository>();
            services.AddScoped(typeof(ICrudRepository<PaymentRecord>), typeof(CrudDatabaseRepository<PaymentRecord, PaymentsContext>));
            services.AddScoped(typeof(ICrudRepository<Sales>), typeof(CrudDatabaseRepository<Sales, PaymentsContext>));
            services.AddScoped(typeof(ICrudRepository<ShoppingEvent>), typeof(CrudDatabaseRepository<ShoppingEvent, PaymentsContext>));
            services.AddScoped(typeof(ICrudRepository<TourBought>), typeof(CrudDatabaseRepository<TourBought, PaymentsContext>));
            services.AddScoped(typeof(ICrudRepository<CouponUsed>), typeof(CrudDatabaseRepository<CouponUsed, PaymentsContext>));
            services.AddScoped<ICouponRepository, CouponDatabaseRepository>();
            services.AddScoped<IWalletRepository, WalletDatabaseRepository>();
            services.AddScoped<IInternalBoughtItemDatabaseRepository, InternalBoughtItemDatabaseRepository>();
            services.AddDbContext<PaymentsContext>(opt =>
            opt.UseNpgsql(DbConnectionStringBuilder.Build("payments"),
                x => x.MigrationsHistoryTable("__EFMigrationsHistory", "payments")));
        }
    }
}
