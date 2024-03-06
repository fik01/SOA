using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain
{
    public class Wallet : Entity
    {
        public long UserId { get; init; }
        public int Balance { get; private set; }

        public Wallet(long userId, int balance)
        {
            UserId = userId;
            Balance = balance;
        }

        public Wallet()
        {
        }

        public void AddToBallance(int coins)
        {
            Balance += coins; 
        }

        public void SubFromBallance(int coins)
        {
            if (coins > Balance) throw new InvalidOperationException($"Cannot go under the current ballance = {Balance}AC !");
            Balance -= coins;
        }
    }
}
