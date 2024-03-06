using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Dtos
{
    public class ChangePasswordDto
    {
        public string newPassword {  get; set; }
        public string newPasswordConfirm {  get; set; }
        public string token { get; set; }
    }
}
