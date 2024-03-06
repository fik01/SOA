using Explorer.Stakeholders.Core;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.Followers;
using Microsoft.EntityFrameworkCore;

namespace Explorer.Stakeholders.Infrastructure.Database;

public class StakeholdersContext : DbContext
{
    
    public DbSet<User> Users { get; set; }
    public DbSet<Person> People { get; set; }
    public DbSet<ApplicationRating> ApplicationRatings { get; set; }
    public DbSet<Club> Clubs { get; set; }
    public DbSet<JoinRequest> JoinRequests { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Follower> Followers { get; set; }

    public DbSet<UserNews> UserNews { get; set; }

    public StakeholdersContext(DbContextOptions<StakeholdersContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("stakeholders");

        modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();

        modelBuilder.Entity<Follower>().Property(item => item.Notification).HasColumnType("jsonb");

        ConfigureStakeholder(modelBuilder); 
    }

    private static void ConfigureStakeholder(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>()
            .HasOne<User>()
            .WithOne()
            .HasForeignKey<Person>(s => s.UserId);

        modelBuilder.Entity<Club>()
            .HasOne<User>()
            .WithOne()
            .HasForeignKey<Club>(s => s.TouristId);

        modelBuilder.Entity<JoinRequest>()
        .HasOne<User>()
        .WithMany()
        .HasForeignKey(jr => jr.UserId);

        modelBuilder.Entity<JoinRequest>()
            .HasOne<Club>()
            .WithMany()
            .HasForeignKey(jr => jr.ClubId);

        modelBuilder.Entity<Follower>()
            .HasOne<Person>()
            .WithMany()
            .HasForeignKey(f => f.FollowerId);

        modelBuilder.Entity<Follower>()
            .HasOne<Person>()
            .WithMany()
            .HasForeignKey(f => f.FollowedId);  
    }
}