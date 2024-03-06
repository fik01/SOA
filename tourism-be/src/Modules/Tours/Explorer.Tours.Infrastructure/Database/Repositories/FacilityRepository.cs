using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;

namespace Explorer.Tours.Infrastructure.Database.Repositories
{
    public class FacilityRepository : IFacilityRepository
    {
        private readonly ToursContext _dbContext;

        public FacilityRepository(ToursContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Facility GetById(int id)
        {
            var facility = _dbContext.Facilities.FirstOrDefault(x => x.Id == id);
            return facility;
        }

        public Facility Update(Facility newFacility)
        {
            var facility = _dbContext.Facilities.FirstOrDefault(x => x.Id == newFacility.Id);
            facility = newFacility;
            _dbContext.SaveChanges();
            return facility;
        }

        public List<PublicFacility> GetByStatus(PublicFacility.PublicFacilityStatus status)
        {
            var facilities = _dbContext.PublicFacility.Where(x => x.Status == status).ToList();
            return facilities;
        }
    }
}
