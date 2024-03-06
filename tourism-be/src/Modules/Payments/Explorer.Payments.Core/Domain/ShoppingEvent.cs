using Explorer.BuildingBlocks.Core.Domain;
using Explorer.Payments.Core.Domain.DomainEvents;
using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain
{
    public class ShoppingEvent : Entity
    {

        public List<DomainEvent> Changes { get; set; }
        public long? TourId { get; private set; }
        public long? CouponId { get; private set; }

        public ShoppingEvent( long? tourId, long? couponId)
        {
            Changes = new List<DomainEvent>();
            TourId = tourId;
            CouponId = couponId;
        }

        public void Apply(DomainEvent @event)
        {
            When((dynamic)@event);
        }

        private void When(TourBought tour)
        {
            TourId = tour.Id;
        }

        private void When(CouponUsed coupon)
        {
            CouponId = coupon.Id;
        }

        private void Causes(DomainEvent @event)
        {
            Changes.Add(@event);
            Apply(@event);
        }

    }
}