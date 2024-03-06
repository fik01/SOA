using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using Explorer.Payments.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.Payments.Infrastructure.Database;

namespace Explorer.Payments.Infrastructure.Database.Repositories
{
    public class BoughtItemDatabaseRepository : IBoughtItemRepository
    {
        private readonly PaymentsContext _dbContext;

        public BoughtItemDatabaseRepository(PaymentsContext context)
        {
            _dbContext = context;
        }

        public BoughtItem AddToCart(BoughtItem item)
        {
            _dbContext.BoughtItems.Add(item);
            _dbContext.SaveChanges();

            return item;

        }

        public void DeleteItem(long tourId, long userId)
        {
            var item = _dbContext.BoughtItems.Where(item => item.TourId == tourId && item.UserId == userId).FirstOrDefault();
            _dbContext.BoughtItems.Remove(item);
            _dbContext.SaveChanges();
        }

        public void GetItemToUpdate(long userId, long tourId)
        {
            var itemToUpdate = _dbContext.BoughtItems.Where(item => item.UserId == userId && item.TourId == tourId && !item.IsUsed).FirstOrDefault();
            if (itemToUpdate == null)
            {
                return;
            }

            if (!itemToUpdate.IsUsed)
            {
                typeof(BoughtItem).GetProperty("IsUsed").SetValue(itemToUpdate, true);
            }


            try
            {
                if (itemToUpdate != null)
                {
                    _dbContext.BoughtItems.Update(itemToUpdate);
                    _dbContext.SaveChanges();
                }

            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }

        }

        public List<BoughtItem> GetAllByUserId(long userId)
        {
            return _dbContext.BoughtItems.Where(i => i.UserId == userId).ToList();
        }

        public List<BoughtItem> GetAll()
        {
            var query = _dbContext.BoughtItems;
            return query.ToList();
        }
        public List<BoughtItem> GetByTourId(long tourId)
        {
            return _dbContext.BoughtItems.Where(i => i.TourId == tourId).ToList();
        }
    }
}
