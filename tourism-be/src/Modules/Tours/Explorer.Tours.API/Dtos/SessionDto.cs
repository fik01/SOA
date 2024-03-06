using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos
{
    public class SessionDto
    {
        public long Id { get; set; }
        public long TourId { get; set; }
        public long TouristId { get; set; }
        public long LocationId { get; set; }
        public int SessionStatus { get; set; }
        public int Transportation {  get; set; }
        public int DistanceCrossedPercent { get; set; }
        public DateTime LastActivity { get; set; }
        public List<CompletedKeyPointDto> CompletedKeyPoints { get; set; }
    }
}
