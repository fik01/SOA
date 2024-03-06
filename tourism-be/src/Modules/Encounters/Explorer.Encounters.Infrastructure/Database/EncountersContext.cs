using Explorer.Encounters.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;

namespace Explorer.Encounters.Infrastructure.Database
{
    public class EncountersContext : DbContext
    {
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<ChallengeExecution> ChallengeExecutions { get; set; }
        public DbSet<UserExperience> UserExperience { get; set; }
        public EncountersContext(DbContextOptions<EncountersContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("encounters");

            modelBuilder.Entity<ChallengeExecution>()
                .HasOne(item => item.Challenge)
                .WithMany()
                .HasForeignKey("ChallengeId");
        }
    }
}
