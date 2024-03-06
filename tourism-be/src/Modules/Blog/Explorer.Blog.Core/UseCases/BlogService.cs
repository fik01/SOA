using AutoMapper;
using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.Blog.Core.Domain;
using Explorer.Blog.Core.Domain.RepositoryInterfaces;
using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Internal;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using FluentResults;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.Core.UseCases
{
    public class BlogService:CrudService<BlogDto, BlogPage>, IBlogService
    {
        public IInternalBlogService _internalBlogService;
        public IInternalCommentService _internalCommentService;
        public IBlogRepository _blogRepository;
        public ICommentService _commentService;
        public BlogService(ICrudRepository<BlogPage> repository , IMapper mapper, IInternalBlogService internalBlogService, IBlogRepository blogRepository, IInternalCommentService internalCommentService, ICommentService commentService):base(repository,mapper) {
            _internalBlogService = internalBlogService;
            _internalCommentService = internalCommentService;
            _blogRepository = blogRepository;
            _commentService = commentService;
        }

        public Result<BlogDto> Get(int id)
        {
            try
            {
                var blog = _blogRepository.Get(id);
                if (blog == null)return Result.Fail(FailureCode.NotFound).WithError("Blog not found.");
                
                var user = _internalBlogService.GetByUserId(blog.UserId);
                if (user == null)return Result.Fail(FailureCode.NotFound).WithError("User not found.");
                
                var result= MapToDto(blog);
                result.Username = user.Username;
                return result;
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<List<BlogDto>> GetAll()
        {
            try
            {
                var blogs = MapToDto(_blogRepository.GetAll());

                foreach (var blog in blogs.Value)
                {
                    var user = _internalBlogService.GetByUserId(blog.UserId);
                    blog.Username = user.Username;
                }

                return blogs;
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<CommentDto> CreateComment(CommentDto comment)
        {
            var result = _commentService.Create(comment);
            return result;
        }

        public Result<CommentDto> UpdateComment(CommentDto comment)
        {
            var result = _commentService.Update(comment);
            return result;
        }

        public Result DeleteComment(int id)
        {
            var result = _commentService.Delete(id);
            return result;
        }

        public Result<CommentDto> GetComment(int id)
        {
            var result = _commentService.Get(id);
            if (result.IsSuccess == true)
            {
                var user = _internalBlogService.GetByUserId(result.Value.UserId);
                result.Value.Username = user.Username;
                var person = _internalCommentService.GetByUserId(user.Id);
                result.Value.ProfilePic = person.ProfilePic;
            }
            return result;
        }

        public Result<PagedResult<CommentDto>> GetPagedComments(int page, int pageSize)
        {
            var result = _commentService.GetPaged(page, pageSize);
            return result;
        }

        public Result<List<CommentDto>> GetCommentsByBlogId(int blogId)
        {
            var result = _commentService.GetCommentsByBlogId(blogId);

            foreach (var comment in result.Value)
            {
                var user = _internalBlogService.GetByUserId(comment.UserId);
                comment.Username = user.Username;
                var person = _internalCommentService.GetByUserId(user.Id);
                comment.ProfilePic = person.ProfilePic;
            }

            return result;
        }

        public Result DeleteRating(int blogId,int userId)
        {
            var result=_blogRepository.DeleteRating(userId, blogId);

            return result;
        }

        public Result<BlogDto> UpdateRating(int blogId,int userId,int value)
        {
            var result = _blogRepository.UpdateRating(blogId,userId,value);

            return MapToDto(result);
        }

        public Result<List<BlogDto>> GetBlogsByStatus(int state)
        {
            var blogs = _blogRepository.GetBlogsByStatus(state);
            if(blogs==null)return Result.Fail(FailureCode.NotFound).WithError("Blog not found.");  

            var result= MapToDto(blogs);

            foreach (var blog in result.Value)
            {
                var user = _internalBlogService.GetByUserId(blog.UserId);
                if (user == null) return Result.Fail(FailureCode.NotFound).WithError("User not found.");
                blog.Username = user.Username;
            }

            return result;
        }

        public Result<List<BlogDto>> GetBlogsByAuthor(int authorId)
        {
            var blogs = _blogRepository.GetBlogsByAuthor(authorId);
            if (blogs == null) return Result.Fail(FailureCode.NotFound).WithError("Blog not found.");

            var result = MapToDto(blogs);

            foreach (var blog in result.Value)
            {
                var user = _internalBlogService.GetByUserId(blog.UserId);
                if (user == null) return Result.Fail(FailureCode.NotFound).WithError("User not found.");
                blog.Username = user.Username;
            }

            return result;
        }
    }
}
