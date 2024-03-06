using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain.Sessions.DomainEvents
{
    public class LocationUpdated : DomainEvent
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public LocationUpdated(long id, double latitude, double longitude) : base(id)
        {
            Latitude = latitude;
            Longitude = longitude;
        }
    }
}
