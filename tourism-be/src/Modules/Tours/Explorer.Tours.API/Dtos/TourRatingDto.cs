using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos
{
    public class TourRatingDto
    {
        public long Id { get; set; }
        public long PersonId { get; set; }
        public long TourId { get; set; }
        public int Mark { get; set; }
        public string Comment { get; set; }
        public DateTime DateOfVisit { get; set; }
        public DateTime DateOfCommenting { get; set; }
        public List<Uri> Images { get; set; }
    }
}
