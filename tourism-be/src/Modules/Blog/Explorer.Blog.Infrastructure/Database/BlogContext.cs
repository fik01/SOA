using Explorer.Blog.Core.Domain;
using Explorer.Stakeholders.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace Explorer.Blog.Infrastructure.Database;

public class BlogContext : DbContext
{
    public DbSet<Comment> Comments { get; set; }
    public DbSet<BlogPage> Blogs { get; set; }
    public BlogContext(DbContextOptions<BlogContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("blog");

        modelBuilder.Entity<BlogPage>().HasIndex(u => u.Title).IsUnique();

        modelBuilder.Entity<BlogPage>().Property(item => item.Ratings).HasColumnType("jsonb");
    }
}