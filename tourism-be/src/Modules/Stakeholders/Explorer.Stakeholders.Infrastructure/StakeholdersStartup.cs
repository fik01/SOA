using Castle.Core.Smtp;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.BuildingBlocks.Infrastructure.Email;
using Explorer.Stakeholders.API.Internal;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.API.Public.Identity;
using Explorer.Stakeholders.Core;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using Explorer.Stakeholders.Core.Mappers;
using Explorer.Stakeholders.Core.UseCases;
using Explorer.Stakeholders.Core.UseCases.Identity;
using Explorer.Stakeholders.Infrastructure.Authentication;
using Explorer.Stakeholders.Infrastructure.Database;
using Explorer.Stakeholders.Infrastructure.Database.Repositories;
using Explorer.Stakeholders.Infrastructure.Email;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Explorer.Stakeholders.Infrastructure;

public static class StakeholdersStartup
{
    public static IServiceCollection ConfigureStakeholdersModule(this IServiceCollection services)
    {
        // AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

        services.AddAutoMapper(typeof(StakeholderProfile).Assembly);
        SetupCore(services);
        SetupInfrastructure(services);
        return services;
    }
    
    private static void SetupCore(IServiceCollection services)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<ITokenGenerator, JwtGenerator>();
        services.AddScoped<IApplicationRatingService, ApplicationRatingService>();
        services.AddScoped<IPersonService, PersonService>();
        services.AddScoped<IClubService, ClubService>();
        services.AddScoped<IJoinRequestService, JoinRequestService>();
        services.AddScoped<IUserInformationService, UserInformationService>();
        services.AddScoped<IPersonInformationService, PersonInformationService>();
        services.AddScoped<IUserActivityService, UserActivityService>();
        services.AddScoped<IUserNames,UserNamesService>();
        services.AddScoped<IFollowerService, FollowerService>();
        services.AddScoped<IInternalBlogService, InternalBlogService>();
        services.AddScoped<IInternalCommentService, InternalCommentService>();
        services.AddScoped<IMessageService, MessageService>();
        services.AddScoped<IEmailSendingService, EmailSedningService>();
        services.AddScoped<IUserNewsService, UserNewsService>();


    }

    private static void SetupInfrastructure(IServiceCollection services)
    {
        services.AddScoped(typeof(ICrudRepository<Person>), typeof(CrudDatabaseRepository<Person, StakeholdersContext>));
        services.AddScoped<IUserRepository, UserDatabaseRepository>();
        services.AddScoped(typeof(ICrudRepository<ApplicationRating>), typeof(CrudDatabaseRepository<ApplicationRating, StakeholdersContext>));
        services.AddScoped<IPersonRepository, PersonRepository>();
        services.AddScoped<IJoinRequestRepository, JoinRequestRepository>();
        services.AddScoped(typeof(ICrudRepository<Club>), typeof(CrudDatabaseRepository<Club, StakeholdersContext>));
        services.AddScoped(typeof(ICrudRepository<JoinRequest>), typeof(CrudDatabaseRepository<JoinRequest, StakeholdersContext>));
        services.AddScoped(typeof(ICrudRepository<User>), 
            typeof(CrudDatabaseRepository<User, StakeholdersContext>));
        services.AddScoped(typeof(ICrudRepository<User>), 
            typeof(CrudDatabaseRepository<User, StakeholdersContext>));
        services.AddScoped<IFollowerRepository, FollowerRepository>();
        services.AddScoped<IInternalBlogRepository, InternalBlogRepository>();
        services.AddScoped<IInternalCommentRepository, InternalCommentRepository>();
        services.AddScoped<IMessageRepository, MessageRepository>();
        services.AddScoped(typeof(ICrudRepository<UserNews>), typeof(CrudDatabaseRepository<UserNews, StakeholdersContext>));
        services.AddScoped<IUserNewsRepository, UserNewsRepository>();


        services.AddDbContext<StakeholdersContext>(opt =>
            opt.UseNpgsql(DbConnectionStringBuilder.Build("stakeholders"),
                x => x.MigrationsHistoryTable("__EFMigrationsHistory", "stakeholders")));

    }
}