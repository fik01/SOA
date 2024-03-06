using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain
{
    public class PublicFacility : Facility
    {

        public PublicFacilityStatus Status { get; private set; }
        public int CreatorId { get; init; }


        public PublicFacility(string name, string description, Uri image, FacilityCategory category, double latitude, double longitude, PublicFacilityStatus status, int creatorId) : base(name, description, image, category, latitude, longitude)
        {
            Status = status;
            CreatorId = creatorId;

        }

        public void ChangeStatus(PublicFacilityStatus status)
        {
            Status = status;
        }

        public enum PublicFacilityStatus
        {
            Approved,
            Denied,
            Pending
        }
    }
}
