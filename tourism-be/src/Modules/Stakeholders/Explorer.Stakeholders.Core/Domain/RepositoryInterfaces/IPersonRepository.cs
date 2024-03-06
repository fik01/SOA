using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.Domain.RepositoryInterfaces
{
    public interface IPersonRepository
    {
        List<Person> GetAuthorsAndTourists();
        Person? Get(int id);
        Person Update(Person person);
        public List<Person> GetAllFollowers(int id);
        public List<Person> GetAllFollowings(int id);
        Person GetByEmail(string email);
        Person GetByUserId(long id);
        string GetNameById(int id);

    }
}
