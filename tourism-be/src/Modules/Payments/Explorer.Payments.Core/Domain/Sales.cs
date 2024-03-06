using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain
{
    public class Sales : Entity
    {
        public DateTime StartDate { get; init; }
        public DateTime EndDate { get; init; }
        public float DiscountPercentage { get; init; }
        public long TourId { get; init; }
        public Sales(DateTime startDate, DateTime endDate, float discountPercentage, long tourId)
        {
            StartDate = startDate.ToUniversalTime();
            EndDate = endDate.ToUniversalTime();
            DiscountPercentage = discountPercentage;
            TourId = tourId;
        }
    }
}
