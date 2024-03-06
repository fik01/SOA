using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos
{
    public class CouponUsedDto
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public DateTime DateOfUsing { get; set; }
    }
}
