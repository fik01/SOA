using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.Core.Domain.Sessions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Infrastructure.Database.Repositories
{
    public class SessionRepository : ISessionRepository
    {
        private readonly ToursContext _context;
        private readonly DbSet<Session> _dbSet;

        public SessionRepository(ToursContext context)
        {
            _context = context;
            _dbSet = _context.Set<Session>();
        }

        public Session Create(Session session)
        {
            _context.Add(session);
            _context.SaveChanges();
            return session;
        }

        public Session Get(long id)
        {
            return _context.Sessions.SingleOrDefault(s => s.Id == id);
        }

        public Session? GetActiveByTouristId(long id)
        {
            return _context.Sessions.FirstOrDefault(s => s.TouristId == id && s.SessionStatus == SessionStatus.ACTIVE);
        }
        public Session? GetActiveSessionByTouristId(long id)
        {
            return _context.Sessions.FirstOrDefault(s => s.TouristId == id && s.SessionStatus == SessionStatus.ACTIVE);
        }

        public List<Session> GetAllByTouristId(long id)
        {
            return _context.Sessions.Where(s => s.TouristId == id).ToList();
        }

        public Session Update(Session session)
        {
            try
            {
                _context.Update(session);
                _context.SaveChanges();
            }
            catch(DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }

            return session;
        }

        public Session AddCompletedKeyPoint(int sessionId, int keyPointId)
        {
            var session = _context.Sessions.FirstOrDefault(s => s.Id == sessionId);
            var completedKeyPoint = session.AddCompletedKeyPoint(keyPointId);
            _context.Sessions.Update(session);

            _context.SaveChanges();
            return session;
        }

        public Session? GetByTourAndTouristId(long tourId, long touristId)
        {
            return _context.Sessions.FirstOrDefault(s => s.TouristId == touristId &&  s.TourId == tourId);
        }

        public List<Session> GetAll()
        {
            var query = _context.Sessions;
            return query.ToList();
        }

        public PagedResult<Session> GetPagedByTouristId(long touristId, int page, int pageSize)
        {
            var task = _dbSet.Where(s => s.TouristId == touristId).GetPagedById(page, pageSize);
            task.Wait();
            return task.Result;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
