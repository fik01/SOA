using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain
{
    public class PaymentRecord : Entity
    {
        public int TouristId { get; init; }
        public int BundleId { get; init; }
        public double Price { get; init; }
        public DateTime DateTimeOfBuying { get; init; }

        public PaymentRecord(int touristId, int bundleId, double price, DateTime dateTimeOfBuying)
        {
            TouristId = touristId;
            BundleId = bundleId;
            Price = price;
            DateTimeOfBuying = dateTimeOfBuying;

            Validate();
        }

        private void Validate()
        {
            if (TouristId == 0) throw new ArgumentException("Invalid touristId");
            if (BundleId == 0) throw new ArgumentException("Invalid bundleId");
            if (Price == 0) throw new ArgumentException("Invalid price");
            if (DateTimeOfBuying > DateTime.Now) throw new ArgumentException("Invalid dateTimeOfBuying");
        }
    }
}
