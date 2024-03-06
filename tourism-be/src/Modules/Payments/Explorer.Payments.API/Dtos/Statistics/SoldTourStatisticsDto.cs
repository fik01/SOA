using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos.Statistics
{
    public class SoldTourStatisticsDto
    {
        public long TourId { get; set; }
        public double NumberOfStats { get; set; }
    }
}
