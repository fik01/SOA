using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.Blog.Core.UseCases;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/blog")]
    public class BlogController : BaseApiController
    {
        private readonly IBlogService _blogService;
        //private readonly ICommentService _commentService;

        private static HttpClient _blogClient = new()
        {
            BaseAddress = new Uri("http://localhost:8090"),
        };

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
        public async Task<ActionResult<CommentDto>> Create([FromBody] CommentDto commentDto)
        {
            var result = await CreateCommentAsync(_blogClient, commentDto);
            return Ok(result);
        }

        static async Task<CommentDto> CreateCommentAsync(HttpClient httpClient, CommentDto commentDto)
        {
            using StringContent jsonContent = new(
                JsonSerializer.Serialize(commentDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("blog/createComment", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            var result = JsonSerializer.Deserialize<CommentDto>(jsonResponse);

            return result;
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
        public async Task<ActionResult<List<CommentDto>>> GetCommentsByBlogId(int blogId)
        {
            HttpResponseMessage response = await _blogClient.GetAsync("blog/blogComments/"+blogId);

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<List<CommentDto>>(responseBody);
                var comments = new PagedResult<CommentDto>(responseObject, 0);

                return Ok(comments);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
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
