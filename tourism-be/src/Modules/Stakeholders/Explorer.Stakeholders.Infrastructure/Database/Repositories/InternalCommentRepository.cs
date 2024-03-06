using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Infrastructure.Database.Repositories
{
    public class InternalCommentRepository : IInternalCommentRepository
    {
        private readonly StakeholdersContext _dbContext;

        public InternalCommentRepository(StakeholdersContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Person GetPersonByUserId(long userId)
        {
            return _dbContext.People.FirstOrDefault(person => person.UserId == userId);
        }
    }
}
