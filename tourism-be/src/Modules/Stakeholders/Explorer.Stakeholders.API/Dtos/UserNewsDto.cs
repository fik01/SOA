using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Dtos
{
    public class UserNewsDto
    {
        public int Id { get; set; }
        public long TouristId { get; set; }
        public long LastSendMs { get;  set; }
        public int SendingPeriod { get;  set; }

        public UserNewsDto(int id, long touristId, long lastSendMs, int sendingPeriod)
        {
            Id = id;
            TouristId = touristId;
            LastSendMs = lastSendMs;
            SendingPeriod = sendingPeriod;
        }
    }
}
