using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain.ServiceInterfaces
{
    public interface ITourStatisticsDomainService
    {
        List<TourStatistics> CalculateSoldToursStatistics(List<BoughtItem> boughtItems);
    }
}
