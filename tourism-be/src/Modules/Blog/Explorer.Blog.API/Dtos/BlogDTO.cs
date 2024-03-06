

using System.Text.Json.Serialization;

namespace Explorer.Blog.API.Dtos
{
    public enum BlogState
        {
            Draft,
            Published,
            Closed,
            Famous,
            Active
        }
    public class BlogDto
    {
        
        public long Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public BlogState? Status { get; set; }
        public long UserId {  get; set; }
        public string Username { get; set; }
        public int RatingSum { get; set; }
        public List<RatingDto> Ratings { get; set; }

        public BlogDto(long id, string title, string? description, BlogState? status, long userId, string username, int ratingSum, List<RatingDto> ratings)
        {
            Id = id;
            Title = title;
            Description = description;
            Status = status;
            UserId = userId;
            Username = username;
            RatingSum = ratingSum;
            Ratings = ratings;
        }

        public BlogDto()
        {
        }
    }
}
