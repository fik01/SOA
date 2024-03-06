using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.BuildingBlocks.Infrastructure.Email
{
    public interface IEmailSendingService
    {

        Task SendEmailAsync(string to, string subject, string body, bool isBodyHtml = false);

    }
}
