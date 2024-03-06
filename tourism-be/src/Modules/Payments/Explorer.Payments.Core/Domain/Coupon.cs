using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain
{
    public class Coupon : Entity
    {
        public string Code { get; init; }
        public double Discount { get; private set; }
        public DateTime? ExpirationDate { get; init; }
        public int? TourId { get; private set; }
        public int AuthorId { get; init; }
        public bool IsUsed { get; private set; }

        public Coupon(string code, double discount, DateTime? expirationDate, int? tourId, int authorId)
        {
            Code = code;
            Discount = discount;
            ExpirationDate = expirationDate;
            TourId = tourId;
            AuthorId = authorId;
            IsUsed = false;
        }
        public Coupon() { }
        public void SetDiscountForDto(double d)
        {
            Discount = d;
        }
        public void SetTourIdForDto(int id)
        {
            TourId = id;
        }
        public void SetIsUsedForDto(bool isUsed)
        {
            IsUsed = isUsed;
        }
    }
}
