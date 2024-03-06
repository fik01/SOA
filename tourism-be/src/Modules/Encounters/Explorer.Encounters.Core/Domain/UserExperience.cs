using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.Core.Domain
{
    public class UserExperience:Entity
    {

        public long UserId { get; init; }
        public int XP { get; private set; }
        public int Level { get; private set; }

        public UserExperience(long userId, int xP, int level)
        {
            UserId = userId;
            XP = xP;
            Level = CalculateLevel();
        }

        public UserExperience()
        {
        }

        public int CalculateLevel()
        {
            Level = XP / 20 + 1;
            return Level;
        }
        public void AddXP(int xp)
        {
            XP += xp;
        }
    }
}
