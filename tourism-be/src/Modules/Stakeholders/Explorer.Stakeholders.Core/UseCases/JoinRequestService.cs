using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.UseCases
{
    public class JoinRequestService : CrudService<JoinRequestDto, JoinRequest>, IJoinRequestService
    {
        private readonly IJoinRequestRepository _requestRepository;
        private readonly IUserRepository _userRepository;
        

        public JoinRequestService(ICrudRepository<JoinRequest> repository, IMapper mapper, IJoinRequestRepository requestrepository, IUserRepository userRepository) : base(repository, mapper) {

            _requestRepository = requestrepository;
            _userRepository = userRepository;
        }

        public Result<string> CheckStatusOfRequest(long touristId, long clubId)
        {
            return _requestRepository.CheckStatusOfRequest(touristId, clubId);
        }

        public Result<List<RequestDto>> FindRequests(long ownerId)
        {
            List<JoinRequest> requests = _requestRepository.FindRequestsForOwner(ownerId);

            List<RequestDto> dtoList = new List<RequestDto>();

            foreach (JoinRequest request in requests)
            {
                RequestDto dto = new RequestDto
                {
                    Id = request.Id,
                    Username = _userRepository.GetUsername(request.UserId),
                    ClubId = request.ClubId,
                    UserId = request.UserId,
                    RequestStatus = request.RequestStatus,
                    RequestDirection = request.RequestDirection
                };
                dtoList.Add(dto);
            }

            return dtoList;
        }

        public Result<PagedResult<ClubMemberDto>> GetClubMembers(long clubId,int pageIndex,int pageSize)
        {
            var clubMemberIds = _requestRepository.GetClubMembersIds(clubId).Select(x => x.UserId).ToList();
            var users = _userRepository.GetAll();


            var members = users.Where(x => clubMemberIds.Contains(x.Id)).Select(x => new ClubMemberDto { Id = x.Id, Username = x.Username });
            return new PagedResult<ClubMemberDto>(members.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList(), members.Count());
        }

        public Result<PagedResult<ClubMemberDto>> GetInvitableUsers(long clubId,int pageIndex,int pageSize)
        {
            var invitedAndMembers = _requestRepository.GetInvitedAndMemberIds(clubId).Select(x => x.UserId).ToList();
            var users = _userRepository.GetAll();

            var invitableUsers = users.Where(x => !invitedAndMembers.Contains(x.Id) && x.Role == UserRole.Tourist).Select(x => new ClubMemberDto { Id = x.Id, Username = x.Username });
            return new PagedResult<ClubMemberDto>(invitableUsers.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList(), invitableUsers.Count());
        }

        public Result<long> KickMember(long clubId, long userId)
        {
            return _requestRepository.KickMember(clubId, userId);
        }

        public Result<List<ClubDto>> getClubsToJoin(long userId)
        {
            List<ClubDto> dtoList = new List<ClubDto>();
            List<Club> clubs = _requestRepository.getClubsToJoin(userId);

            foreach (Club club in clubs)
            {
                ClubDto dto = new ClubDto
                {
                    Id = club.Id,
                    Name = club.Name,
                    Description= club.Description,
                    ClubPicture= club.ClubPicture,
                    TouristId = club.TouristId  
                    
                };
                dtoList.Add(dto);
            }

            return dtoList;

        }
    }
}
