using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Public
{
    public interface IJoinRequestService
    {
        Result<JoinRequestDto> Create(JoinRequestDto club);
        Result<JoinRequestDto> Update(JoinRequestDto club);
        Result<List<RequestDto>> FindRequests(long ownerId); // its going to be one of those 2 parameters probably?
        Result<string> CheckStatusOfRequest(long touristId, long clubId);   // used to see if anyo
        Result Delete(int id);
        Result<PagedResult<ClubMemberDto>> GetClubMembers(long clubId, int pageIndex, int pageSize);
        Result<PagedResult<ClubMemberDto>> GetInvitableUsers(long clubId, int pageIndex, int pageSize);
        Result<long> KickMember(long clubId, long userId);


        Result<List<ClubDto>> getClubsToJoin(long userId);


    }
}
