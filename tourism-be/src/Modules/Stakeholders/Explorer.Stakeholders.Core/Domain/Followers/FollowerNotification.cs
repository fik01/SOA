using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.Domain.Followers
{
    public class FollowerNotification : ValueObject
    {
        public string Content { get; init; }
        public DateTime TimeOfArrival { get; init; }
        public bool Read { get; init; }

        [JsonConstructor]
        public FollowerNotification(string content, DateTime timeOfArrival, bool read)
        {
            Content = content;
            TimeOfArrival = timeOfArrival;
            Read = read;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Content;
            yield return TimeOfArrival;
            yield return Read;
        }
    }
}
