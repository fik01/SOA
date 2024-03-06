using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain
{
    public class TourStatistics : ValueObject
    {
        public long TourId { get; set; }
        public double NumberOfStats { get; set; }

        public TourStatistics(long tourId, double numberOfStats)
        {
            TourId = tourId;
            NumberOfStats=numberOfStats;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return TourId;
            yield return NumberOfStats;
        }
    }
}
