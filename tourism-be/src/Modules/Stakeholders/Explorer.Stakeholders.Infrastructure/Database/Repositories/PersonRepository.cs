using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Infrastructure.Database.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly StakeholdersContext _dbContext;

        public PersonRepository(StakeholdersContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Person? Get(int id)
        {
            var query = from person in _dbContext.People
                        join user in _dbContext.Users on person.UserId equals user.Id
                        where user.Role != UserRole.Administrator
            select person;

            var entity = query.FirstOrDefault(p => p.Id == id);

            if (entity == null) throw new KeyNotFoundException("Not found: " + id);
            return entity;
        }


        public List<Person> GetAuthorsAndTourists()
        {
            var query = from person in _dbContext.People
                        join user in _dbContext.Users on person.UserId equals user.Id
                        where user.Role == UserRole.Author || user.Role == UserRole.Tourist
                        select person;

            return query.ToList();
        }

        public Person Update(Person person)
        {
            try
            {
                _dbContext.Update(person);
                _dbContext.SaveChanges();
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }

            return person;
        }

        public List<Person> GetAllFollowers(int id)
        {
            var query = from person in _dbContext.People
                        join follower in _dbContext.Followers on person.Id equals follower.FollowerId
                        where follower.FollowedId == id
                        select person;

            return query.ToList();
        }

        public List<Person> GetAllFollowings(int id)
        {
            var query = from person in _dbContext.People
                        join follower in _dbContext.Followers on person.Id equals follower.FollowedId
                        where follower.FollowerId == id
                        select person;

            return query.ToList();
        }

        public Person GetByEmail(string email)
        {
            var person = _dbContext.People.FirstOrDefault(x => x.Email == email);
            return person;
        }
        public Person GetByUserId(long id)
        {
            var person = _dbContext.People.FirstOrDefault(x => x.UserId == id);
            return person;
        }

        public string GetNameById(int id)
        {
            var name = _dbContext.People.FirstOrDefault(x => x.UserId == id).Name+" "+ _dbContext.People.FirstOrDefault(x => x.UserId == id).Surname;
            return name;
        }
    }
}
