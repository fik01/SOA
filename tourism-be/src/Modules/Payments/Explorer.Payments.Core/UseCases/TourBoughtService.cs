using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.DomainEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.UseCases
{
    public class TourBoughtService : CrudService<TourBoughtDto, TourBought>, ITourBoughtService
    {
        public TourBoughtService(ICrudRepository<TourBought> repository, IMapper mapper) : base(repository, mapper)
        {
        }
    }
}
