using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.UseCases
{
    public class WalletService : BaseService<WalletDto,Wallet>, IWalletService
    {
        private readonly IWalletRepository _walletRepository;

        public WalletService(IMapper mapper, IWalletRepository walletRepository) : base(mapper)
        {
            _walletRepository = walletRepository;
        }

        public Result<WalletDto> Create(WalletDto wallet)
        {
            return base.MapToDto(_walletRepository.Create(base.MapToDomain(wallet)));
        }

        public Result<WalletDto> GetByUserId(long userId)
        {
            return base.MapToDto(_walletRepository.GetByUserId(userId));
        }

        public Result<WalletDto> AddToBallance(long userId,int coins)
        {
            return base.MapToDto(_walletRepository.AddToBallance(userId, coins));
        }

        public Result<WalletDto> SubFromBallance(long userId, int coins)
        {
            return base.MapToDto(_walletRepository.SubFromBallance(userId, coins));
        }

        public Result<List<WalletDto>> GetAll()
        {
            return _walletRepository.GetAll().Select(wallet => base.MapToDto(wallet)).ToList();
        }
    }
}
