using Explorer.Encounters.Core.Domain;
using Explorer.Encounters.Core.Domain.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Infrastructure.Database.Repositories
{
    public class UserExperienceRepository:IUserExperienceRepository
    {
        private readonly EncountersContext _context;

        public UserExperienceRepository(EncountersContext context)
        {
            _context = context;
        }

        public UserExperience GetByUserId(long userId)
        {
            var userExperience = _context.UserExperience.Where(u => u.UserId == userId);
            return userExperience.First();
        }
        public UserExperience Create(UserExperience userExperience)
        {
            _context.UserExperience.Add(userExperience);
            _context.SaveChanges();
            return userExperience;
        }
    }
}
