using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.API.Public;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.Core.Mappers;
using Explorer.Tours.Core.UseCases;
using Explorer.Tours.Core.UseCases.Administration;
using Explorer.Tours.Infrastructure.Database;
using Explorer.Tours.Infrastructure.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Explorer.Stakeholders.Core.UseCases;
using Explorer.Tours.Core.Domain.Tours;
using Explorer.Tours.Core.Domain.Sessions;
using Explorer.Tours.API.Public.Execution;
using Explorer.Tours.Core.UseCases.Execution;
using Explorer.Tours.Core.UseCases.Authoring;
using Explorer.Tours.API.Public.Authoring;
using Explorer.Tours.API.Internal;
using Explorer.BuildingBlocks.Infrastructure.Email;
using Explorer.Tours.Infrastructure.Email;
using Explorer.Tours.Core.Domain.ServiceInterfaces;

namespace Explorer.Tours.Infrastructure;

public static class ToursStartup
{
    public static IServiceCollection ConfigureToursModule(this IServiceCollection services)
    {
        // Registers all profiles since it works on the assembly
        services.AddAutoMapper(typeof(ToursProfile).Assembly);
        SetupCore(services);
        SetupInfrastructure(services);
        return services;
    }
    
    private static void SetupCore(IServiceCollection services)
    {
        services.AddScoped<IEquipmentService, EquipmentService>();
        services.AddScoped<ITourService, TourService>();
        services.AddScoped<ITourKeyPointService, TourKeyPointService>();
        services.AddScoped<IFacilityService, FacilityService>();
        services.AddScoped<ITourRatingService, TourRatingService>();
        services.AddScoped<ITourProblemService, TourProblemService>();
        services.AddScoped<IPreferencesService, PreferencesService>();
        services.AddScoped<ISessionService, SessionService>();
        services.AddScoped<IPositionSimulatorService, PositionSimulatorService>();
        services.AddScoped<IEquipmentTrackingService, EquipmentTrackingService>();
        services.AddScoped<IPublicTourKeyPointService, PublicTourKeyPointService>();
        services.AddScoped<IPublicFacilityService, PublicFacilityService>();
        services.AddScoped<IInternalTourService, TourService>();
        services.AddScoped<IRecommenderService, RecommenderService>();
        services.AddScoped<IEmailSendingTourCommunityRecommendationService, EmailSendingTourCommunityRecommendationService>();
        services.AddScoped<IInternalPersonService, InternalPersonService>();
        services.AddScoped<ITourStatisticsDomainService, TourStatisticsDomainService>();
    }

    private static void SetupInfrastructure(IServiceCollection services)
    {
        services.AddScoped<ITourKeyPointsRepository, TourKeyPointsRepository>();
        services.AddScoped<IFacilityRepository, FacilityRepository>();
        services.AddScoped(typeof(ICrudRepository<Equipment>), typeof(CrudDatabaseRepository<Equipment, ToursContext>));
        services.AddScoped(typeof(ITourRepository), typeof(TourDatabaseRepository));
        services.AddScoped(typeof(ICrudRepository<TourKeyPoint>), typeof(CrudDatabaseRepository<TourKeyPoint, ToursContext>));
        services.AddScoped(typeof(ICrudRepository<Facility>), typeof(CrudDatabaseRepository<Facility, ToursContext>));
        services.AddScoped(typeof(ICrudRepository<TourRating>), typeof(CrudDatabaseRepository<TourRating, ToursContext>));
        services.AddScoped(typeof(ICrudRepository<TourProblem>), typeof(CrudDatabaseRepository<TourProblem, ToursContext>));    
        services.AddScoped<ISessionRepository, SessionRepository>();
        services.AddScoped(typeof(IPositionSimulatorRepository), typeof(PositionSimulatorDatabaseRepository));
        services.AddScoped(typeof(ICrudRepository<PublicTourKeyPoints>), typeof(CrudDatabaseRepository<PublicTourKeyPoints, ToursContext>));
        services.AddScoped(typeof(ICrudRepository<PublicFacility>), typeof(CrudDatabaseRepository<PublicFacility, ToursContext>));
        services.AddScoped(typeof(ICrudRepository<Preferences>), typeof(CrudDatabaseRepository<Preferences, ToursContext>));

        services.AddScoped<IPreferencesRepository, PreferencesRepository>();
        services.AddScoped<ITourProblemRepository, TourProblemRepository>();


        services.AddScoped(typeof(ICrudRepository<EquipmentTracking>), typeof(CrudDatabaseRepository<EquipmentTracking, ToursContext>));
        services.AddScoped<IEquipmentTrackingRepository, EquipmentTrackingRepository>();

        services.AddScoped<ITourRatingRepository, TourRatingRepository>();

        services.AddDbContext<ToursContext>(opt =>
            opt.UseNpgsql(DbConnectionStringBuilder.Build("tours"),
                x => x.MigrationsHistoryTable("__EFMigrationsHistory", "tours")));
    }
}