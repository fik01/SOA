using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.Blog.Core.UseCases;
using Explorer.BuildingBlocks.Core.UseCases;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/blog")]
    public class BlogController : BaseApiController
    {
        private readonly IBlogService _blogService;
        //private readonly ICommentService _commentService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
            //_commentService = commentService;
        }

        [HttpPost]
        public ActionResult<BlogDto> Create([FromBody] BlogDto blog)
        {
            var result = _blogService.Create(blog);
            return CreateResponse(result);
        }

        [HttpGet]
        public ActionResult<List<BlogDto>> GetAll()
        {
            var result = _blogService.GetAll();

            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<List<BlogDto>> UpdateBlog([FromBody]  BlogDto blog)
        {
            var result = _blogService.Update(blog);
            var returnresult = _blogService.GetAll();

            return CreateResponse(returnresult);
        }

        [HttpPut("oneBlogUpdated")]
        public ActionResult<BlogDto> UpdateOneBlog([FromBody] BlogDto blog)
        {
            var result = _blogService.Update(blog);

            return CreateResponse(result);
        }

        [HttpGet("{id:int}")]
        public ActionResult<BlogDto> Get(int id)
        {
            var result = _blogService.Get(id);
            return CreateResponse(result);
        }

        [HttpPost("createComment")]
        public ActionResult<CommentDto> Create([FromBody] CommentDto commentDto)
        {
            var result = _blogService.CreateComment(commentDto);
            return CreateResponse(result);
        }

        [HttpGet("comment/{id:int}")]
        public ActionResult<CommentDto> GetComment(int id)
        {
            var result = _blogService.GetComment(id);
            return CreateResponse(result);
        }

        [HttpPut("editComment")]
        public ActionResult<CommentDto> UpdateComment([FromBody] CommentDto commentDto)
        {
            var result = _blogService.UpdateComment(commentDto);
            return CreateResponse(result);
        }

        [HttpDelete("deleteComment/{id:int}")]
        public ActionResult DeleteComment(int id)
        {
            var result = _blogService.DeleteComment(id);
            return CreateResponse(result);
        }

        [HttpGet("allComments")]
        public ActionResult<PagedResult<CommentDto>> GetAllComments([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _blogService.GetPagedComments(page, pageSize);
            return CreateResponse(result);
        }

        [HttpGet("blogComments/{blogId:int}")]
        public ActionResult<List<CommentDto>> GetCommentsByBlogId(int blogId)
        {
            var result = _blogService.GetCommentsByBlogId(blogId);
            return CreateResponse(result);
        }

        [HttpDelete("rating/{userId:int}/{blogId:int}")]
        public ActionResult DeleteRating(int blogId, int userId)
        {
            var result = _blogService.DeleteRating(blogId, userId);
            return CreateResponse(result);
        }

        [HttpPut("rating/{userId:int}/{blogId:int}/{value:int}")]
        public ActionResult<BlogDto> UpdateRating(int blogId, int userId, int value)
        {
            var result = _blogService.UpdateRating(blogId, userId, value);
            return CreateResponse(result);
        }

        [HttpGet("getByStatus/{state:int}")]
        public ActionResult<List<BlogDto>> GetBlogsByStatus(int state)
        {
            var result = _blogService.GetBlogsByStatus(state);
            return CreateResponse(result);
        }

        [HttpGet("getByAuthor/{authorId:int}")]
        public ActionResult<List<BlogDto>> GetBlogsByAuthor(int authorId)
        {
            var result = _blogService.GetBlogsByAuthor(authorId);
            return CreateResponse(result);
        }
    }
}
