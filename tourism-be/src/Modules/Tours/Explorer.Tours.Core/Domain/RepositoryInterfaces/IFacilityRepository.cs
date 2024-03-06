using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain.RepositoryInterfaces
{
    public interface IFacilityRepository
    {

        Facility GetById(int id);
        Facility Update(Facility facility);

        List<PublicFacility> GetByStatus(PublicFacility.PublicFacilityStatus status);
    }
}
