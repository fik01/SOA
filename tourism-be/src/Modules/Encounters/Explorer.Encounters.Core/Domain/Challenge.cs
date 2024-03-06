using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Core.Domain
{
    public class Challenge : Entity
    {
        public long CreatorId { get; init; }
        public string Description { get; init; }
        public string Name { get; init; }
        public ChallengeStatus Status { get; init; }
        public ChallengeType Type { get; init; }
        public double Latitude { get; init; }
        public double Longitude { get; init; }
        public int ExperiencePoints { get; init; }
        public long? KeyPointId { get; init; }
        public Uri? Image { get; init; }
        public double? LatitudeImage { get; init; }
        public double? LongitudeImage { get; init; }
        public double Range { get; init; }
        public int? RequiredAttendance { get; set; }

        public Challenge(long creatorId, string description, string name, ChallengeStatus status, ChallengeType type, double latitude, double longitude, 
            Uri? image, double? latitudeImage, double? longitudeImage, double range, int experiencePoints, long? keyPointId, int? requiredAttendance)
        {
            CreatorId = creatorId;
            Description = description;
            Name = name;
            Status = status;
            Type = type;
            Latitude = latitude;
            Longitude = longitude;
            Image = image;
            LatitudeImage = latitudeImage;
            LongitudeImage = longitudeImage;
            Range = range;
            ExperiencePoints = experiencePoints;
            KeyPointId = keyPointId;
            RequiredAttendance = requiredAttendance;

            Validate();
        }
        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Description)) throw new ArgumentException("Invalid Description");
            if (string.IsNullOrWhiteSpace(Name)) throw new ArgumentException("Invalid Name");
            if (Latitude is > 90 or < -90) throw new ArgumentException("Invalid latitude");
            if (Longitude is > 180 or < -180) throw new ArgumentException("Invalid longitude");
        }
    }
    public enum ChallengeStatus
    {
        Draft,
        Active,
        Archived
    }

    public enum ChallengeType
    {
        Social,
        Location,
        Misc
    }
}
