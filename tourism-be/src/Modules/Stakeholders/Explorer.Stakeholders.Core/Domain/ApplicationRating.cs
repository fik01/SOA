using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Explorer.Stakeholders.Core.Domain
{
    public class ApplicationRating : Entity
    {
        public int Grade { get; init; }
        public string? Comment { get; init; }
        public DateTime IssueDate { get; init; }
        public long UserId { get; init; }

        public ApplicationRating(int grade, string? comment, DateTime issueDate, long userId)
        {
            Grade = grade;
            Comment = comment;
            IssueDate = issueDate;
            UserId = userId;
            Validate();
        }
        private void Validate()
        {
            if (UserId == 0) throw new ArgumentException("Invalid PersonId");
            if (Grade > 5 || Grade < 1) throw new ArgumentException("Invalid Grade");
            if (IssueDate > DateTime.Now) throw new ArgumentException("Invalid IssueDate");
        }
    }
}
