using Explorer.Blog.API.Dtos;
using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.API.Public
{
    public interface IBlogService
    {
        Result<PagedResult<BlogDto>> GetPaged(int page, int pageSize);
        Result<BlogDto> Create(BlogDto blog);
        Result<BlogDto> Update(BlogDto blog);
        Result Delete(int id);
        Result<BlogDto> Get(int id);
        Result<CommentDto> CreateComment(CommentDto comment);
        Result<CommentDto> UpdateComment(CommentDto comment);
        Result DeleteComment(int id);
        Result<CommentDto> GetComment(int id);
        Result<PagedResult<CommentDto>> GetPagedComments(int page, int pageSize);
        Result<List<CommentDto>> GetCommentsByBlogId(int blogId);
        Result<List<BlogDto>> GetAll();
        Result DeleteRating(int blogId, int userId);
        Result<BlogDto> UpdateRating(int blogId, int userId,int value);
        Result<List<BlogDto>> GetBlogsByStatus(int state);
        Result<List<BlogDto>> GetBlogsByAuthor(int authorId);
    }
}
