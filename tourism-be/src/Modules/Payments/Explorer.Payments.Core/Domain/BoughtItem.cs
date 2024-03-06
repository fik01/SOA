using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain
{
    public class BoughtItem : Entity
    {

        public int UserId { get; init; }
        public int TourId { get; init; }
        public DateTime? DateOfBuying { get; init; }

        public bool IsUsed { get; init; }

        public BoughtItem(int userId, int tourId)
        {
            UserId = userId;
            TourId = tourId;
            DateOfBuying = DateTime.UtcNow;
            IsUsed = false;
        }
    }
}
