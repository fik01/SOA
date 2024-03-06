using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain.DomainEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.UseCases
{
    public class CouponUsedService : CrudService<CouponUsedDto, CouponUsed>, ICouponUsedService
    {
        public CouponUsedService(ICrudRepository<CouponUsed> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
