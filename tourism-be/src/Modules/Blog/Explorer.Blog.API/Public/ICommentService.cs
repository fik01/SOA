using Explorer.Blog.API.Dtos;
using Explorer.BuildingBlocks.Core.UseCases;
using FluentResults;

namespace Explorer.Blog.API.Public
{
    public interface ICommentService
    {
        Result<PagedResult<CommentDto>> GetPaged(int page, int pageSize);
        Result<CommentDto> Create(CommentDto comment);
        Result<CommentDto> Update(CommentDto comment);
        Result<CommentDto> Get(int id);
        Result Delete(int id);
        Result<List<CommentDto>> GetCommentsByBlogId(int blogId);
    }
}
