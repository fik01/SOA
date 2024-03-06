using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos.Statistics
{
    public class TourStatisticsDto
    {
        public long TourId { get; set; }
        public double NumberOfStats { get; set; }
    }
}
