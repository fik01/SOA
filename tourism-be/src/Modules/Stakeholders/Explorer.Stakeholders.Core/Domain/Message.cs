using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.Domain
{
    public class Message : Entity
    {
        public string Content { get; init; }
        public DateTime CreationTime { get; init; }
        public long SenderId { get; init; }
        public long RecipientId { get; init; }

        public Message(string content, DateTime creationTime, long senderId, long recipientId)
        {
            Content = content;
            CreationTime = creationTime;
            SenderId = senderId;
            RecipientId = recipientId;
            Validate();
        }
        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Content)) throw new ArgumentException("Invalid Content");
            if (SenderId == 0) throw new ArgumentException("Invalid SenderId");
            if (RecipientId == 0) throw new ArgumentException("Invalid RecipientId");
            if (string.IsNullOrWhiteSpace(CreationTime.ToString())) throw new ArgumentException("Invalid CreationTime.");
        }
    }
}
