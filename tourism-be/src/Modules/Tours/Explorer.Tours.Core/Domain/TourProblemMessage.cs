using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Explorer.Blog.Core.Domain
{
    public class TourProblemMessage : ValueObject
    {
        public long SenderId { get; init; }

        public long RecipientId { get; init; }
        public DateTime CreationTime { get; init; }
        public string Description { get; init; }
        public bool IsRead { get; init; }


        [JsonConstructor]
        public TourProblemMessage(long senderId,long recipientId, DateTime creationTime, string description,bool isRead)
        {
            SenderId = senderId;
            RecipientId = recipientId;
            CreationTime = creationTime;
            Description = description;
            IsRead = isRead;
        }
        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return SenderId;
            yield return RecipientId;
            yield return CreationTime;
            yield return Description;
        }

    }
}
