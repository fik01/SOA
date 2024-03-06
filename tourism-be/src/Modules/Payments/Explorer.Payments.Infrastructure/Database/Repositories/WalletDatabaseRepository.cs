using Explorer.BuildingBlocks.Core.Domain;
using Explorer.Payments.Core.Domain;
using Explorer.Payments.Core.Domain.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Infrastructure.Database.Repositories
{
    public class WalletDatabaseRepository : IWalletRepository
    {
        private readonly PaymentsContext _dbContext;

        public WalletDatabaseRepository(PaymentsContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Wallet Create(Wallet wallet)
        {
            _dbContext.Wallet.Add(wallet);
            _dbContext.SaveChanges();
            return wallet;
        }

        public Wallet GetByUserId(long userId)
        {
            var entity = _dbContext.Wallet.Where(wallet => wallet.UserId == userId).FirstOrDefault();
            if (entity == null) throw new KeyNotFoundException($"Wallet with userId={userId} not found!");
            return entity;
        }

        public Wallet AddToBallance(long userId,int coins)
        {
            var entity = _dbContext.Wallet.Where(wallet => wallet.UserId == userId).FirstOrDefault();
            if (entity == null) throw new KeyNotFoundException($"Wallet with userId={userId} not found!");
            entity.AddToBallance(coins);
            _dbContext.SaveChanges();
            return entity;
        }

        public Wallet SubFromBallance(long userId, int coins)
        {
            var entity = _dbContext.Wallet.Where(wallet => wallet.UserId == userId).FirstOrDefault();
            if (entity == null) throw new KeyNotFoundException($"Wallet with userId={userId} not found!");
            entity.SubFromBallance(coins);
            _dbContext.SaveChanges();
            return entity;
        }

        public IEnumerable<Wallet> GetAll()
        {
            return _dbContext.Wallet.ToList();
        }
    }
}
