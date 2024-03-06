using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Dtos
{
    public class RequestDto
    
     {
        public long Id { get; set; }

        public string Username { get; set; }
        public long ClubId { get; set; }
        public long UserId { get; set; }
        public string RequestStatus { get; set; }
        public bool RequestDirection { get; set; }

    }
}
