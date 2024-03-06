using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Dtos
{
    public class FollowerNotificationDto
    {
        public string Content { get; set; }
        public DateTime TimeOfArrival { get; set; }
        public bool Read { get; set; }
    }
}
