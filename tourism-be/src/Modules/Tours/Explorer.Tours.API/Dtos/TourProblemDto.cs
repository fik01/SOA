using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos
{
    public enum TourProblemPriority
    {
        LOW = 0,
        MEDIUM,
        HIGH
    }
    public enum TourProblemCategory
    {
        BOOKING = 0,
        ITINERARY,
        PAYMENT,
        TRANSPORTATION,
        GUIDE_SERVICES,
        OTHER
    }
    public class TourProblemDto
    {
        public int Id { get; set; }
        public long TouristId { get; set; }
        public long TourId { get; set; }
        public TourProblemCategory Category { get; set; }
        public TourProblemPriority Priority { get; set; }
        public string Description { get; set; }
        public DateTime Time { get; set; }
        public string TouristUsername { get; set; }
        public string AuthorUsername { get; set; }
        public Boolean IsSolved { get; set; }
        public List<TourProblemMessageDto> Messages { get; set; }
        public DateTime Deadline { get; set; }
    }
}
