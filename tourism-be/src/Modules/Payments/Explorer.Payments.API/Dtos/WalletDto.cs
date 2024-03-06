using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos
{
    public class WalletDto
    {
        public long UserId { get; set; }
        public int Balance { get; set; }

        public WalletDto(long userId, int balance)
        {
            UserId = userId;
            Balance = balance;
        }

        public WalletDto()
        {
        }
    }
}
