using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public.Administration;
using Explorer.Tours.Core.UseCases.Administration;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;
using System.Net;
using System.Net.Http;

namespace Explorer.API.Controllers.Tourist
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/blog")]
    public class BlogController : BaseApiController
    {
        private readonly IBlogService _blogService;
        //private readonly ICommentService _commentService;

        private static HttpClient _blogClient;

        public BlogController(IBlogService blogService, IHttpClientFactory httpClientFactory)
        {
            _blogService = blogService;
            //_commentService = commentService;

            _blogClient = httpClientFactory.CreateClient();
            var service = Environment.GetEnvironmentVariable("GO_BLOG_SERVICE_HOST") ?? "localhost";
            _blogClient.BaseAddress = new Uri($"http://{service}:8090");
        }

        [HttpPost]
        public async Task<ActionResult<BlogDto>> Create([FromBody] BlogDto blog)
        {
            var result = await CreateBlogAsync(_blogClient, blog);
            return Ok(result);
        }

        static async Task<CommentDto> CreateBlogAsync(HttpClient httpClient, BlogDto blogDto)
        {
            using StringContent jsonContent = new(
                JsonSerializer.Serialize(blogDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PostAsync("blog", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            var result = JsonSerializer.Deserialize<CommentDto>(jsonResponse);

            return result;
        }

        [HttpGet]
        public async Task<ActionResult<List<BlogDto>>> GetAll()
        {
            HttpResponseMessage response = await _blogClient.GetAsync("blog");

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<List<BlogDto>>(responseBody);
                var blogs = new PagedResult<BlogDto>(responseObject, responseObject.Count);

                return Ok(blogs);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult<BlogDto> Get(int id)
        {
            var result = _blogService.Get(id);
            return CreateResponse(result);
        }

        [HttpPut]
        public ActionResult<List<BlogDto>> UpdateBlog([FromBody] BlogDto blog)
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
        public async Task<ActionResult<CommentDto>> UpdateComment([FromBody] CommentDto commentDto)
        {
            var result = await UpdateCommentAsync(_blogClient, commentDto);
            return Ok(result);
        }
        static async Task<CommentDto> UpdateCommentAsync(HttpClient httpClient, CommentDto commentDto)
        {
            using StringContent jsonContent = new(
                JsonSerializer.Serialize(commentDto),
                Encoding.UTF8,
                "application/json");

            using HttpResponseMessage response = await httpClient.PutAsync("blog/updateComment", jsonContent);

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"{jsonResponse}\n");

            var result = JsonSerializer.Deserialize<CommentDto>(jsonResponse);

            return result;
        }

        [HttpDelete("deleteComment/{id:int}")]
        public async Task<ActionResult> DeleteComment(int id)
        {
            var result = DeleteCommentAsync(_blogClient, id);
            return result.Result ? Ok() : NotFound();
        }

        static async Task<bool> DeleteCommentAsync(HttpClient httpClient, int id)
        {
            using HttpResponseMessage response = await httpClient.DeleteAsync("blog/deleteComment/" + id);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                return false;
            }

            response.EnsureSuccessStatusCode();
            return false;
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
            HttpResponseMessage response = await _blogClient.GetAsync("blog/blogComments/" + blogId);

            if (response.IsSuccessStatusCode)
            {

                string responseBody = await response.Content.ReadAsStringAsync();

                var responseObject = JsonSerializer.Deserialize<List<CommentDto>>(responseBody);
                var comments = new PagedResult<CommentDto>(responseObject, responseObject.Count);

                return Ok(comments);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Failed to fetch data from the GoLang API");
            }
        }

        [HttpDelete("rating/{userId:int}/{blogId:int}")]
        public ActionResult DeleteRating(int blogId,int userId)
        {
            var result=_blogService.DeleteRating(blogId, userId);
            return CreateResponse(result);
        }

        [HttpPut("rating/{userId:int}/{blogId:int}/{value:int}")]
        public ActionResult<BlogDto> UpdateRating(int blogId, int userId,int value)
        {
            var result = _blogService.UpdateRating(blogId, userId,value);
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
