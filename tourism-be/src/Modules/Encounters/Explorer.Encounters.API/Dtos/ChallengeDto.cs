using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.API.Dtos
{
    public class ChallengeDto
    {
        public int Id { get; set; }
        public long CreatorId { get; set; }
        public string? Description { get; set; }
        public string? Name { get; set; }
        public int Status { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Type { get; set; }
        public int ExperiencePoints { get; set; }
        public Uri? Image { get; set; }
        public double? LatitudeImage { get; set; }
        public double? LongitudeImage { get; set; }
        public double Range { get; set; }
        public long? KeyPointId { get; set; }
        public int? RequiredAttendance { get; set; }
    }
}
