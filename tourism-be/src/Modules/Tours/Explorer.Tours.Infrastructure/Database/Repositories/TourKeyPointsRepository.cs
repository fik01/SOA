using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.Core.Domain.Tours;

namespace Explorer.Tours.Infrastructure.Database.Repositories
{
    public class TourKeyPointsRepository : ITourKeyPointsRepository
    {
        private readonly ToursContext _dbContext;

        public TourKeyPointsRepository(ToursContext dbContext)
        {
            _dbContext = dbContext;
        }
        public List<TourKeyPoint> GetByTourId(long tourId)
        {
            var keyPoints = _dbContext.TourKeyPoints.Where(x => x.TourId == tourId).ToList();
            return keyPoints;
        }
        public TourKeyPoint GetById(int id)
        {
            var keyPoint = _dbContext.TourKeyPoints.FirstOrDefault(x => x.Id == id);
            return keyPoint;
        }

        public TourKeyPoint Update(TourKeyPoint tourKeyPoint)
        {
            var keyPoint = _dbContext.TourKeyPoints.FirstOrDefault(x => x.Id == tourKeyPoint.Id);
            keyPoint = tourKeyPoint;
            _dbContext.SaveChanges();
            return keyPoint;
        }

        public List<PublicTourKeyPoints> GetByStatus(PublicTourKeyPoints.PublicTourKeyPointStatus status)
        {
            var keyPoints = _dbContext.PublicTourKeyPoints.Where(x => x.Status == status).ToList();
            return keyPoints;
        }

        public List<TourKeyPoint> GetAllByPublicId(long publicId)
        {
            var keyPoints = _dbContext.TourKeyPoints.Where(x => x.PublicPointId == publicId).ToList();
            return keyPoints;
        }
    }
}
