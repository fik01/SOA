using Explorer.BuildingBlocks.Core.Domain;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.BuildingBlocks.Infrastructure.Database;
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
    public class JoinRequestRepository : IJoinRequestRepository
    {

        private readonly StakeholdersContext _dbContext;

        public JoinRequestRepository(StakeholdersContext dbContext)
        {
            _dbContext = dbContext;
        }


        public List<JoinRequest> FindRequestsForOwner(long clubId)
        {

                List<JoinRequest> requests = _dbContext.JoinRequests.ToList().Where(jr => jr.ClubId == clubId).ToList().
                Where(jr => jr.RequestStatus == "pending" && jr.RequestDirection).ToList();   //RequestDirection is true if tourist sent request to the owner

            return requests;
        }

        public List<Club> getClubsToJoin(long userId)
        {
            var userClub = _dbContext.Clubs.FirstOrDefault(club => club.TouristId == userId);

            if (userClub == null)
            {
                var allClubs = _dbContext.Clubs.Where(club => club.TouristId != userId).ToList();

               
                var clubIdsWithRequests = _dbContext.JoinRequests
                    .Where(request => request.UserId == userId)
                    .Select(request => request.ClubId)
                    .ToList();

      
                var clubsToJoin = allClubs.Where(club => !clubIdsWithRequests.Contains(club.Id)).ToList();


                return clubsToJoin;
            }
            else
            {
                var allClubs = _dbContext.Clubs.Where(club => club.TouristId != userId).ToList();

                var clubIdsWithRequests = _dbContext.JoinRequests
                    .Where(request => request.UserId == userId)
                    .Select(request => request.ClubId)
                    .ToList();

                
                var clubsToJoin = allClubs.Where(club => club.Id != userClub.Id && !clubIdsWithRequests.Contains(club.Id)).ToList();

                return clubsToJoin;
            }
        }

        public string CheckStatusOfRequest(long touristId, long clubId)
        {
            foreach (JoinRequest request in _dbContext.JoinRequests)
            {
                if (request.UserId == touristId && request.ClubId == clubId)
                {
                    return request.RequestStatus;
                }
            }
            return string.Empty;
        }

        public List<JoinRequest> GetClubMembersIds(long clubId)
        {
            return _dbContext.JoinRequests.Where(x => x.ClubId == clubId && x.RequestStatus == "accepted").ToList();
        }    

        public List<JoinRequest> GetInvitedAndMemberIds(long clubId)
        {
            return _dbContext.JoinRequests.Where(x => x.ClubId == clubId && (x.RequestStatus == "pending" || x.RequestStatus == "accepted")).ToList();
        }

        public long KickMember(long clubId,long userId)
        {
            var user = _dbContext.JoinRequests.Where(x => x.ClubId == clubId && x.UserId == userId).FirstOrDefault();
            typeof(JoinRequest).GetProperty("RequestStatus").SetValue(user, "declined");

            try
            {
                _dbContext.JoinRequests.Update(user);
                _dbContext.SaveChanges();

                return userId;
            }
            catch (DbUpdateException e)
            {
                throw new KeyNotFoundException(e.Message);
            }


        }

    }
}
