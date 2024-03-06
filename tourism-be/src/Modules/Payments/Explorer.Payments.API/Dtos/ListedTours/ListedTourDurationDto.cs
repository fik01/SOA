using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos.ListedTours
{
    public class ListedTourDurationDto
    {
        public uint TimeInSeconds { get; set; }
        public int Transportation { get; set; }
    }
}
