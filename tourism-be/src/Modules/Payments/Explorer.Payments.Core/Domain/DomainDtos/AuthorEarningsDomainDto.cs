using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain.DomainDtos
{
    public class AuthorEarningsDomainDto
    {
        public long AuthorId { get; set; }
        public double Earning { get; set; }
        public long TourId { get; set; }
        public string TourName { get; set; }
    
    }
}
