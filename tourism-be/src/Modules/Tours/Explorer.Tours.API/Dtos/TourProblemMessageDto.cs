using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos
{
    public class TourProblemMessageDto
    {
        public long SenderId { get; set; }
        public long RecipientId { get; set; }
        public DateTime CreationTime { get; set; }
        public string Description { get; set; }
        public string SenderName { get; set; }
        public bool IsRead { get; set; }
    }
}
