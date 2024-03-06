using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Dtos
{
    public class PersonDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public Uri? ProfilePic { get; set; }
        public string? Biography { get; set; }
        public string? Motto { get; set; }
        public string? Role { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}