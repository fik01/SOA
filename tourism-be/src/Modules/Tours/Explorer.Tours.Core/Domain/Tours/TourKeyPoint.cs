using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using Explorer.BuildingBlocks.Core.Domain;
using Microsoft.Extensions.Options;

namespace Explorer.Tours.Core.Domain.Tours
{
    public class TourKeyPoint : Entity
    {
        public string Name { get; init; }
        public string Description { get; init; }
        public Uri Image { get; init; }
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public long? TourId { get; init; }
        public string? Secret { get; init; }
        public int? PositionInTour { get; init; }
        public long? PublicPointId { get; init; }

        public TourKeyPoint(string name, string description, Uri image, double latitude, double longitude, int? positionInTour, long? tourId = 0, string secret = "", long? publicPointId = null)
        {
            Name = name;
            Description = description;
            Image = image;
            Latitude = latitude;
            Longitude = longitude;
            TourId = tourId;
            Secret = secret;
            PositionInTour = positionInTour;
            PublicPointId = publicPointId;
            Validate();
            
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid name");
            if (string.IsNullOrWhiteSpace(Description)) throw new ArgumentException("Invalid description");
            if (Latitude is > 90 or < -90) throw new ArgumentException("Invalid latitude");
            if (Longitude is > 180 or < -180) throw new ArgumentException("Invalid longitude");
        }

    }
}
