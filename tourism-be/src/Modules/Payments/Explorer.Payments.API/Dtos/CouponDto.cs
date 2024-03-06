using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos
{
    public class CouponDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public double Discount { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public int? TourId { get; set; }
        public int AuthorId { get; set; }
        public bool IsUsed { get; set; }
    }
}
