using Explorer.BuildingBlocks.Core.Domain;
using Microsoft.IdentityModel.Tokens;

namespace Explorer.Tours.Core.Domain.Tours
{

    public class Tour : Entity
    {
        public string Name { get; private set; }
        public string Description { get; init; }
        public TourDifficulty Difficulty { get; init; }
        public List<string> Tags { get; init; }
        public TourStatus Status { get; private set; }
        public double Price { get; init; }
        public int AuthorId { get; init; }
        public int[] Equipment { get; init; }
        public double DistanceInKm { get; init; }
        public DateTime? ArchivedDate { get; private set; }
        public DateTime? PublishedDate { get; private set; }
        public List<TourDuration> Durations { get; private set; }
        public List<TourKeyPoint> KeyPoints { get; private set; }
        public Uri? Image { get; private set; }

        public Tour(string name, string description, TourDifficulty difficulty, List<string> tags, TourStatus status, double price, int authorId, int[] equipment, double distanceInKm, DateTime? archivedDate, DateTime? publishedDate, List<TourDuration> durations, Uri? image = null)
        {
            Name = name;
            Description = description;
            Difficulty = difficulty;
            Tags = tags;
            Status = status;
            Price = price;
            AuthorId = authorId;
            Equipment = equipment;
            DistanceInKm = distanceInKm;
            ArchivedDate = archivedDate;
            PublishedDate = publishedDate;
            Durations = durations;
            KeyPoints = new List<TourKeyPoint>();
            if (Status == TourStatus.TouristMade)
            {
                TouristTourValidation();
            }
            Image = image ?? new Uri("https://www.flimslaax.com/fileadmin/Daten/0Flims_Laax_Bilder/3-Outdoor/3-2-Wandern/3-2-1-Wanderwege/flims_laax_falera_wanderwege2.jpg");
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid Name");
            if (string.IsNullOrWhiteSpace(Description)) throw new ArgumentException("Invalid Description");
            if (Price < 0) throw new ArgumentException("Invalid Price");
            if (Tags.IsNullOrEmpty()) throw new ArgumentException("Not enough Tags");
            if (KeyPoints.Count < 2) throw new ArgumentException("Not enough Key Points");
            if (Durations.IsNullOrEmpty()) throw new ArgumentException("Not enough Durations");
            if (Status == TourStatus.Published) throw new ArgumentException("Tour is already published");
        }

        private void TouristTourValidation()
        {
            if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid Name");
            if (Durations.Count == 0) throw new ArgumentException("Not enough Durations");
            if (Status != TourStatus.TouristMade) throw new ArgumentException("Tourist didn't make this tour");
        }

        public void Publish(int userId)
        {
            Validate();
            IsAuthor(userId);

            PublishedDate = DateTime.UtcNow;
            Status = TourStatus.Published;
        }

        public void Archive(int userId)
        {
            if (Status != TourStatus.Published) throw new ArgumentException("Tour must be published in order to be archived");
            IsAuthor(userId);

            ArchivedDate = DateTime.UtcNow;
            Status = TourStatus.Archived;
        }

        private void IsAuthor(int userId)
        {
            if (AuthorId != userId) throw new UnauthorizedAccessException("User is not the author of the tour");
        }

        public void UpdateTouristTour(Tour tour)
        {
            Name = tour.Name;
            KeyPoints = tour.KeyPoints;
            Durations = tour.Durations;
        }
    }

    public enum TourStatus
    {
        Draft,
        Published,
        Archived,
        TouristMade
    }

    public enum TourDifficulty
    {
        Beginner,
        Intermediate,
        Advanced,
        Pro
    }
}
