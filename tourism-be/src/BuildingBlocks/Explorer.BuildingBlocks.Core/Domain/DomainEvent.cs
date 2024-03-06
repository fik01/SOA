using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.BuildingBlocks.Core.Domain
{
    public class DomainEvent
    {
        public long Id { get; private set; }
        public long AggregateRootId { get; private set; }

        public DomainEvent(long aggregateRootId)
        {
            AggregateRootId = aggregateRootId;
        }
    }
}
