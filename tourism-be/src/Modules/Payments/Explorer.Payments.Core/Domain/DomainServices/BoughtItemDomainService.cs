using Explorer.Payments.Core.Domain.DomainServicesInterface;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using FluentResults;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain.DomainServices
{
    public class BoughtItemDomainService:IBoughtItemDomainService
    {
        IBoughtItemRepository _boughtItemRepository;
        public BoughtItemDomainService(IBoughtItemRepository boughtItemRepository) 
        {
            _boughtItemRepository = boughtItemRepository;
        }
        public Result<List<BoughtItem>> GetAll()
        {
            return _boughtItemRepository.GetAll().ToResult();
        }
    }
}
