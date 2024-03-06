using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain.DomainServicesInterface
{
    public interface IBoughtItemDomainService
    {
        public Result<List<BoughtItem>> GetAll();
    }
}
