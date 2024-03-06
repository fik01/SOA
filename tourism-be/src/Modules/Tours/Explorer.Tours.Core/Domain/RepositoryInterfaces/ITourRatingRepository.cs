using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain.RepositoryInterfaces
{
    public interface ITourRatingRepository
    {
        List<TourRating> GetByTourId(int tourId);
        List<TourRating> GetAll();
        TourRating GetByPersonIdAndTourId(long personId, long tourId);
    }
}
