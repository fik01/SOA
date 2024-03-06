using Explorer.Payments.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Public
{
    public interface IWalletService
    {
        Result<WalletDto> Create(WalletDto wallet);
        Result<WalletDto> GetByUserId(long userId);
        Result<WalletDto> AddToBallance(long userId, int coins);
        Result<WalletDto> SubFromBallance(long userId, int coins);
        Result<List<WalletDto>> GetAll();
    }
}
