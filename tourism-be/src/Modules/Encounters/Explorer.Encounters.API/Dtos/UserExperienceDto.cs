using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Encounters.API.Dtos
{
    public class UserExperienceDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public int XP { get; set; }
        public int Level { get; set; }

        public UserExperienceDto()
        {
        }
        public UserExperienceDto(long userId, int xP, int level)
        {
            UserId = userId;
            XP = xP;
            Level = level;
        }
    }
}
