using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Explorer.Stakeholders.Core.Domain.Followers;

namespace Explorer.Stakeholders.Core.Domain.RepositoryInterfaces
{
    public interface IFollowerRepository
    {
        List<Follower> GetFollowersNotifications(int id);
        Follower Create(Follower follower);
        void Delete(int followerId, int followedId);
        List<Follower> GetFollowings(int id);
    }
}
