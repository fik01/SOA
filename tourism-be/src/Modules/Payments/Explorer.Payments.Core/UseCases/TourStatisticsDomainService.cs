using Explorer.Payments.API.Dtos.Statistics;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.UseCases
{
    public class TourStatisticsDomainService : ITourStatisticsDomainService
    {
        public TourStatisticsDomainService() { }

        public List<TourStatistics> CalculateSoldToursStatistics(List<BoughtItem> boughtItems)
        {
            var mostSoldToursStatistics = new List<TourStatistics>();

            foreach (var item in boughtItems)
            {
                var matchingStat = mostSoldToursStatistics.FirstOrDefault(stat => stat.TourId == item.TourId);

                if (matchingStat != null)
                {
                    matchingStat.NumberOfStats += 1;
                }
                else
                {
                    TourStatistics stat = new TourStatistics(item.TourId, 1);
                    mostSoldToursStatistics.Add(stat);
                }
            }

            return mostSoldToursStatistics;
        }
    }
}
