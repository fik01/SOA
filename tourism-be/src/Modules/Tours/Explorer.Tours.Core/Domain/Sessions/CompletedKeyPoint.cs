using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain.Sessions
{
    public class CompletedKeyPoint : ValueObject
    {   
        public int KeyPointId { get; init; }
        public DateTime CompletionTime { get; init; }

        [JsonConstructor]
        public CompletedKeyPoint(int keyPointId, DateTime completionTime)
        {
            KeyPointId = keyPointId;
            CompletionTime = completionTime;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return KeyPointId;
            yield return CompletionTime;
        }
    }
}
