using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Infrastructure.Database.Repositories
{
    public class InternalBoughtItemDatabaseRepository : IInternalBoughtItemDatabaseRepository
    {
        private readonly PaymentsContext _dbContext;
        private readonly DbSet<BoughtItem> _dbSet;

        public InternalBoughtItemDatabaseRepository(PaymentsContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<BoughtItem>();
        }

        public BoughtItem CreateBoughtItem(BoughtItem item)
        {
            _dbContext.BoughtItems.Add(item);
            _dbContext.SaveChanges();

            return item;
        }


        public List<BoughtItem> GetByUserId(int userId)
        {
            var boughtItem = _dbSet
               .Where(t => t.UserId == userId && t.IsUsed == true).ToList();

            return boughtItem ?? throw new KeyNotFoundException("Not found: " + userId);
        }

        public List<BoughtItem> GetByTourId(long tourId)
        {
            return _dbContext.BoughtItems.Where(i => i.TourId == tourId).ToList();

        }
        public List<BoughtItem> GetAll()
        {
            var query = _dbContext.BoughtItems;
            return query.ToList();
        }
    }
}
