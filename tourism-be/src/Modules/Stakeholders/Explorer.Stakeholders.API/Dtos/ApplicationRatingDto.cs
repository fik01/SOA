using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Explorer.Stakeholders.API.Dtos
{
    public class ApplicationRatingDto
    {
        public int Id { get; set; }
        public int Grade { get; set; }
        public string? Comment { get; set; }
        public DateTime IssueDate { get; set; }
        public long UserId { get; set; }  

    }
}
