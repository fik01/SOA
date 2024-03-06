using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.Payments.Core.Domain;
using Microsoft.EntityFrameworkCore;

namespace Explorer.Payments.Core.Domain.RepositoryInterfaces
{
    public interface IBoughtItemRepository
    {
        BoughtItem AddToCart(BoughtItem item);
        void DeleteItem(long tourId, long userId);
        void GetItemToUpdate(long userId, long tourId);
        List<BoughtItem> GetAll();
        List<BoughtItem> GetAllByUserId(long userId);
        List<BoughtItem> GetByTourId(long tourId);
    }
}
