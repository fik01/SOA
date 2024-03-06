using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Explorer.Stakeholders.API.Dtos
{
    public class UserInformationDto
    {
        public int UserId { get; set; }
        public String Username { get; set; }
        public String Email { get; set; }
        public String Role { get; set; }
        public String Password { get; set; }
        public bool IsActive { get; set; }
        public int Balance { get; set; }

        public UserInformationDto(int userId, string username, string email, String role, bool isAcitve)
        {
            UserId = userId;
            Username = username;
            Email = email;
            Role = role;
            IsActive = isAcitve;
        }

        public UserInformationDto()
        {
        }
    }
}
