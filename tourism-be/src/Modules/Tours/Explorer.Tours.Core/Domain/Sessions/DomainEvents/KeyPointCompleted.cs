using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain.Sessions.DomainEvents
{
    public class KeyPointCompleted : DomainEvent
    {
        public DateTime TimeOfCompletion { get; set; }
        public KeyPointCompleted(long id, DateTime timeOfCompletion) : base(id)
        {
            TimeOfCompletion = timeOfCompletion;
        }
    }
}
