using Microsoft.AspNetCore.SignalR;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.Domain
{
    public class PublicSiteHub : Hub
    {
 

        public override Task OnConnectedAsync()
        {

            var httpContext = Context.GetHttpContext();
            var token = httpContext.Request.Query["access_token"];

            var handler = new JwtSecurityTokenHandler();
            if (!token.IsNullOrEmpty())
            {
                var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

                var userId = jsonToken.Claims.FirstOrDefault(claim => claim.Type == "id")?.Value;
                if (userId != null) Groups.AddToGroupAsync(Context.ConnectionId, userId);
            }


            return base.OnConnectedAsync();
        }

        public async Task SendPublicKeyPointNotification(string publicKeyPoint, string status, int creatorId)
        {
            await Clients.All.SendAsync("ReceivePublicKeyPointNotification", publicKeyPoint, status, creatorId);

        } 
        public async Task SendPublicFacilityNotification(string publicFacility, string status,int creatorId)
        {
            await Clients.All.SendAsync("ReceivePublicFacilityNotification", publicFacility, status, creatorId);
        }

        public async Task SendNewFollowerNotification(string follower, string status, long followedId)
        {
            await Clients.All.SendAsync("ReceiveNewFollowerNotification", follower, status, followedId);
        }

        public async Task SendTourProblemMessageNotification(int recipientId)
        {
            await Clients.All.SendAsync("ReceiveTourProblemMessageNotification", recipientId);
        }
        public async Task SendDeadlineNotification(string authorUsername, long tourId, DateTime deadline)
        {
            await Clients.All.SendAsync("ReceiveDeadlineNotification", authorUsername, tourId, deadline);
        }
        public async Task SendFollowerMessageNotification(long recipientId, string senderUsername)
        {
            await Clients.All.SendAsync("ReceiveFollowerMessageNotification", recipientId, senderUsername);
        }

        public async Task BalanceChanged(string recipientId, string addedCoins, string balance)
        {
            await Clients.Group(recipientId).SendAsync("BalanceChanged", addedCoins, balance);
        }

    }
}
