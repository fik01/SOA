using Explorer.Blog.API.Dtos;
using Explorer.Blog.Core.Domain;
using Explorer.Blog.Core.Domain.RepositoryInterfaces;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Stakeholders.Core.Domain;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.Infrastructure.Database.Repositories
{
    public class BlogRepository:IBlogRepository
    {
        public readonly BlogContext _dbContext;

        public BlogRepository(BlogContext dbContext)
        {
            _dbContext = dbContext;
        }

        public BlogPage? Get(int id)
        {
            var blog=_dbContext.Blogs.FirstOrDefault(b => b.Id == id);
            return blog;
        }

        public List<BlogPage> GetAll()
        {
            var query = _dbContext.Blogs;
            return query.ToList();
        }

        public Result DeleteRating(int userId,int blogId)
        {
            try
            {
                var blog=_dbContext.Blogs.FirstOrDefault(b => b.Id == blogId);
                
                var rating=blog.Ratings.FirstOrDefault(b => b.UserId == userId);
                
                blog.RemoveRating(userId);
                blog.CalculateSum();

                _dbContext.Blogs.Update(blog);

                _dbContext.SaveChanges();
                return Result.Ok();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }

        }

        public BlogPage UpdateRating(int blogId,int userId,int value) { 
            try
            {
                var blog = _dbContext.Blogs.FirstOrDefault(b => b.Id == blogId);
                blog.RemoveRating(userId);
                var rating=blog.AddRating(userId,value);
                blog.CalculateSum();
                _dbContext.Blogs.Update(blog);

                _dbContext.SaveChanges();
                return blog;
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }
        }

        public List<BlogPage> GetBlogsByStatus(int state)
        {
            var query = _dbContext.Blogs.Where(blog => blog.Status == state);
            return query.ToList();
        }

        public List<BlogPage> GetBlogsByAuthor(int authorId)
        {
            var query = _dbContext.Blogs.Where(blog => blog.UserId == authorId);
            return query.ToList();
        }

    }
}
