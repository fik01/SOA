using AutoMapper;
using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.Blog.Core.Domain;
using Explorer.Blog.Core.Domain.RepositoryInterfaces;
using Explorer.BuildingBlocks.Core.UseCases;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.Core.UseCases
{
    public class CommentService : CrudService<CommentDto, Comment>, ICommentService
    {
        public ICommentRepository _commentRepository;

        public CommentService(ICrudRepository<Comment> repository, IMapper mapper, ICommentRepository commentRepository) : base(repository, mapper)
        {
            _commentRepository = commentRepository;
        }

        public Result<List<CommentDto>> GetCommentsByBlogId(int blogId)
        {
            return MapToDto(_commentRepository.GetCommentsByBlogId(blogId));
        }
    }
}
