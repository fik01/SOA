using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Explorer.Stakeholders.Core.Domain;


public class JoinRequest : Entity
{
    public long ClubId { get; private set; }
    public long UserId { get; private set; }
    public string RequestStatus { get; private set; }   //had problems when I tried to set enum for this field, the opcional values will be
                                                        // pending, accepted, declined, canceled
    public bool RequestDirection { get; private set; }  

    public JoinRequest(long clubId, long userId, string requestStatus, bool requestDirection)
    {
        if (clubId == 0) throw new ArgumentException("Invalid UserId");
        if (userId == 0) throw new ArgumentException("Invalid UserId");

        ClubId = clubId;
        UserId = userId;
        RequestStatus = requestStatus;
        RequestDirection = requestDirection;    
    }

}