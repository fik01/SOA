using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos
{
    public class TourBoughtDto
    {
        public long Id { get; set; }
        public long TourId { get; set; }
        public DateTime DateOfBuying { get; set; }
    }
}
