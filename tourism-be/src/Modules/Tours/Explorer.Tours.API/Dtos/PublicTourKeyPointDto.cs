using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos
{
    public class PublicTourKeyPointDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Uri Image { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public String Status { get; set; }
        public int CreatorId { get; set; }
        public int? TourId { get; set; }
        public int? PositionInTour {  get; set; }

    }
}
