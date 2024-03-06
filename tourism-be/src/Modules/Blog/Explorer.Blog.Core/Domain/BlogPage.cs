using Explorer.Blog.API.Dtos;
using Explorer.BuildingBlocks.Core.Domain;
using Explorer.Stakeholders.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Explorer.Blog.Core.Domain
{
    
    public class BlogPage : Entity
    {
        public string Title { get; init; }
        public string? Description { get; init; }
        public DateTime? CreationDate { get; init; }
        public int? Status { get; init; }
        public long UserId {  get; init; }

        public int RatingSum { get; set; }
        public List<Rating> Ratings { get; init; }
        public BlogPage(string title, string? description, int? status, long userId,int ratingSum, List<Rating> ratings)
        {
            if (string.IsNullOrWhiteSpace(title)) throw new ArgumentException("Invalid title.");
            Title = title;
            Description = description;
            CreationDate = DateTime.UtcNow;
            Status = status;
            UserId = userId;
            RatingSum = ratingSum;
            Ratings = ratings;
            
        }

        public void CalculateSum()
        {
            
            RatingSum= Ratings.Sum(d => d.RatingValue);
        }

        public Rating AddRating(int userId,int value)
        {
            var rating = new Rating(userId, DateTime.UtcNow, value);
            var ratingCheck= Ratings.FirstOrDefault(rating => rating.UserId == userId);

            if (ratingCheck == null) Ratings.Add(rating);
            return rating;
        }

        public void RemoveRating(int userId) {
            var ratingToRemove = Ratings.FirstOrDefault(rating => rating.UserId == userId);
            if(ratingToRemove!=null)Ratings.Remove(ratingToRemove);
        }

    }
}

