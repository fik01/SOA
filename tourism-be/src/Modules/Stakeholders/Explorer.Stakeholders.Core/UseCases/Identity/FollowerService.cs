using AutoMapper;
using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.API.Public.Identity;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.Followers;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.UseCases.Identity
{
    public class FollowerService : BaseService<FollowerDto, Follower>, IFollowerService
    {
        private readonly IFollowerRepository _followerRepository;
        private readonly IPersonRepository _personRepository;

        public FollowerService(IFollowerRepository followerRepository, IMapper mapper, IPersonRepository personRepository) : base(mapper)
        {
            _followerRepository = followerRepository;
            _personRepository = personRepository;
        }
        public Result<List<SavedNotificationDto>> GetFollowersNotifications(int id)
        {
            try
            {
                var followers = _followerRepository.GetFollowersNotifications(id);
                List<Person> people = _personRepository.GetAllFollowers(id);

                List<SavedNotificationDto> saveNotifications = new List<SavedNotificationDto>();

                foreach(var follower in followers)
                {
                    var person = people.Find(p => p.Id == follower.FollowerId);

                    saveNotifications.Add(new SavedNotificationDto { FullName = person.Name + " " + person.Surname, TimeOfArrival = follower.Notification.TimeOfArrival });
                }

                return saveNotifications;
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }
        public Result<FollowerDto> Create(FollowerDto follower)
        {
            try
            {
                var result = _followerRepository.Create(MapToDomain(follower));
                return MapToDto(result);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }

        public Result Delete(int followerId, int followedId)
        {
            try
            {
                _followerRepository.Delete(followerId, followedId);
                return Result.Ok();
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }

        public Result<List<FollowerDto>> GetFollowings(int id)
        {
            var result = _followerRepository.GetFollowings(id);
            return MapToDto(result);
        }
    }
}
