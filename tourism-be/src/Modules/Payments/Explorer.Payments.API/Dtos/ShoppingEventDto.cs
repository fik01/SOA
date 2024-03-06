using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos
{
    public class ShoppingEventDto
    {
        public long Id { get; set; }
        public List<DomainEvent> Changes { get; set; }
        public long? TourId { get; set; }
        public long? CouponId { get; set; }
    }
}
