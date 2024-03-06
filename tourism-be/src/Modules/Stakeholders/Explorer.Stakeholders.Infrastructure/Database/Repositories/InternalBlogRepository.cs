using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Infrastructure.Database.Repositories
{
    public class InternalBlogRepository:IInternalBlogRepository
    {
        private readonly StakeholdersContext _dbContext;

        public InternalBlogRepository(StakeholdersContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User GetByUserId(long userId)
        {
            return _dbContext.Users.FirstOrDefault(user => user.Id==userId);
        }
    }
}
