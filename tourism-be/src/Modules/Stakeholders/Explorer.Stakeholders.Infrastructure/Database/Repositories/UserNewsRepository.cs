using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Infrastructure.Database.Repositories
{
    public class UserNewsRepository : IUserNewsRepository
    {
        public readonly StakeholdersContext _dbContext;

        public UserNewsRepository(StakeholdersContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserNews GetByTouristId(int touristId)
        {
            var userNews = _dbContext.UserNews.FirstOrDefault(userNews => userNews.TouristId == touristId);
            return userNews;
        }
    }
}
