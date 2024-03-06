using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain.DomainEvents
{
    public class TourBought : Entity
    {
        public long TourId { get; private set; }

        public long UserId { get; private set; }
        public DateTime DateOfBuying { get; private set; }

        public TourBought(long tourId, long userId, DateTime dateOfBuying)
        {
            TourId = tourId;
            UserId = userId;
            DateOfBuying = dateOfBuying;
        }
    }
}
