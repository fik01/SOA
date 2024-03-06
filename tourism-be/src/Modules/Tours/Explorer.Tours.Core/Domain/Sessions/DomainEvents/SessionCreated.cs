using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain.Sessions.DomainEvents
{
    public class SessionCreated : DomainEvent
    {
        public DateTime TimeOfCreation { get; set; }

        public SessionCreated(long id, DateTime timeOfCreation) : base(id)
        {
            TimeOfCreation = timeOfCreation;
        }
    }
}
