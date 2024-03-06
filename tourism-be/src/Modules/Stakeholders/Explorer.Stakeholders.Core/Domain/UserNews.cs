using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.Domain
{
    public class UserNews : Entity
    {
        public long TouristId {  get;private set; }
        public long LastSendMs {  get;private set; }
        public int SendingPeriod {  get; private set; }


        public UserNews(long touristId, long lastSendMs, int sendingPeriod)
        {
            TouristId = touristId;
            LastSendMs = lastSendMs;
            SendingPeriod = sendingPeriod;
        }


    }
}
