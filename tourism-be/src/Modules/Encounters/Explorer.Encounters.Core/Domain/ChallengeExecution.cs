using Explorer.BuildingBlocks.Core.Domain;

namespace Explorer.Encounters.Core.Domain
{
    public class ChallengeExecution : Entity
    {
        public long TouristId { get; init; }
        public Challenge Challenge { get; init; }
        public long ChallengeId {get; init; }
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public DateTime ActivationTime { get; init; }
        public DateTime? CompletionTime { get; private set; }
        public bool IsCompleted { get; private set; }

        public ChallengeExecution(long touristId, double latitude, double longitude,
            DateTime activationTime, DateTime? completionTime, long challengeId, bool isCompleted)
        {
            TouristId = touristId;
            Latitude = latitude;
            Longitude = longitude;
            ActivationTime = activationTime;
            CompletionTime = completionTime;
            ChallengeId = challengeId;
            IsCompleted = isCompleted;
        }

        public void Complete()
        {
            CompletionTime = DateTime.UtcNow;
            IsCompleted = true;
        }
        public void CheckSocialCompletionConditions(int numberOfTourists)
        {
            if (Challenge.RequiredAttendance > numberOfTourists) throw new ArgumentException("Not enough tourists to complete the challenge");
            if (Challenge.Range > CalculateDistance(Challenge.Latitude, Challenge.Longitude, Latitude, Longitude)) throw new ArgumentException("Not close enough to complete the challenge");
        }

        private double CalculateDistance(double challengeLatitude, double challengeLongitude, double touristLatitude, double touristLongitude)
        {
            int earthRadius = 6371000;

            // Convert latitude and longitude from degrees to radians
            challengeLatitude = ToRadians(challengeLatitude);
            challengeLongitude = ToRadians(challengeLongitude);
            touristLatitude = ToRadians(touristLatitude);
            touristLongitude = ToRadians(touristLongitude);

            // Calculate the differences
            double dlat = challengeLatitude - touristLatitude;
            double dlon = challengeLongitude - touristLongitude;

            // Haversine formula
            double a = Math.Pow(Math.Sin(dlat / 2), 2) + Math.Cos(challengeLatitude) * Math.Cos(challengeLongitude) * Math.Pow(Math.Sin(dlon / 2), 2);
            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            // Calculate the distance
            double distance = earthRadius * c;

            return distance;
        }

        private double ToRadians(double degrees)
        {
            return degrees * Math.PI / 180;
        }
    }
}
