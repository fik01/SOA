using Explorer.BuildingBlocks.Core.Domain;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.Infrastructure.Database.Repositories
{
    public class PreferencesRepository : IPreferencesRepository
    {
        private readonly ToursContext _dbContext;
        public PreferencesRepository(ToursContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Preferences? GetByUserId(long userId)
        {
            return _dbContext.Preferences.FirstOrDefault(p => p.UserId == userId);
        }
    }
}
