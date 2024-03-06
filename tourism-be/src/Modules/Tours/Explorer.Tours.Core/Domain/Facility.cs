using Explorer.BuildingBlocks.Core.Domain;

namespace Explorer.Tours.Core.Domain
{
    public class Facility : Entity
    {
        public string Name { get; init; }
        public string Description { get; init; }
        public Uri Image { get; init; }
        public FacilityCategory Category { get; init; }
        public double Latitude { get; init; }
        public double Longitude { get; init; }

        public Facility(string name, string description, Uri image, FacilityCategory category, double latitude, double longitude)
        {
            Name = name;
            Description = description;
            Image = image;
            Category = category;
            Latitude = latitude;
            Longitude = longitude;
            Validate();
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid name");
            if (string.IsNullOrWhiteSpace(Description)) throw new ArgumentException("Invalid description");
            if (Latitude > 90 || Latitude < -90) throw new ArgumentException("Invalid latitude value");
            if (Longitude > 180 || Latitude < -180) throw new ArgumentException("Invalid longitude value");
        }
    }

    public enum FacilityCategory
    {
        Wc,
        Restaurant,
        Parking,
        Other
    }
}
