using Explorer.BuildingBlocks.Core.Domain;
using System.Reflection.Metadata;

namespace Explorer.Blog.Core.Domain
{
    public class Comment : Entity
    {
        public long UserId { get; init; }
        public DateTime CreationDate { get; init; }
        public string Description { get; init; }
        public DateTime LastEditDate { get; init; }
        public long BlogId { get; init; }

        public Comment(long userId, DateTime creationDate, string description, DateTime lastEditDate, long blogId)
        {
            UserId = userId;
            CreationDate = creationDate;
            Description = description;
            LastEditDate = lastEditDate;
            BlogId = blogId;
            Validate();
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Description)) throw new ArgumentException("Invalid Description");
        }
    }
}
