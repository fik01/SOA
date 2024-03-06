using Explorer.Blog.API.Dtos;
using Explorer.Blog.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.Core.Domain.RepositoryInterfaces
{
    public interface IBlogRepository
    {
        Result DeleteRating(int userId, int blogId);
        BlogPage Get(int id);
        List<BlogPage> GetAll();
        BlogPage UpdateRating(int blogId, int userId,int value);
        List<BlogPage> GetBlogsByStatus(int state);
        List<BlogPage> GetBlogsByAuthor(int author);
    }
}
