using AutoMapper;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Dtos.ListedTours;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.DomainEvents;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Mappers
{
    public class PaymentsProfile : Profile
    {
        public PaymentsProfile()
        {
            CreateMap<BoughtItemDto, BoughtItem>().ReverseMap();
            CreateMap<TourBoughtDto, TourBought>().ReverseMap();
            CreateMap<CouponUsedDto, CouponUsed>().ReverseMap();
            CreateMap<BundleDto, Bundle>().ReverseMap();
            CreateMap<PaymentRecordDto, PaymentRecord>().ReverseMap();
            CreateMap<SalesDto, Sales>().ReverseMap();
            CreateMap<CouponDto, Coupon>().ReverseMap();
            CreateMap<WalletDto,Wallet>().ReverseMap();
            CreateMap<AuthorEarningsDto, BoughtItem>().ReverseMap();

        }
    }
}
