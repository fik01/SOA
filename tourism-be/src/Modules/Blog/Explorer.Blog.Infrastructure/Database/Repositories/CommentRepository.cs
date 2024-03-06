using Explorer.Blog.Core.Domain;
using Explorer.Blog.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.Infrastructure.Database.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        public readonly BlogContext _dbContext;

        public CommentRepository(BlogContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Comment> GetCommentsByBlogId(int blogId)
        {
            var query = _dbContext.Comments.Where(comment => comment.BlogId == blogId);

            return query.ToList();
        }
    }
}
