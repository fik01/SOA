using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos
{
    public class AuthorEarningsDto
    {
        public long AuthorId { get; set; }
        public double Earning { get; set; }
        public long TourId { get; set; }
        public string TourName { get; set;}

        public AuthorEarningsDto(long authorId, double earning, long tourId, string tourName)
        {
            AuthorId = authorId;
            Earning = earning;
            TourId = tourId;
            TourName = tourName;
        }

        public AuthorEarningsDto()
        {
        }
    }
}
