using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.API.Dtos
{
    public class MessageDto
    {
        public int? Id { get; set; }
        public string Content { get; set; }
        public DateTime CreationTime { get; set; }
        public long? SenderId { get; set; }
        public long? RecipientId { get; set; }
        public string SenderUsername { get; set; }
        public string RecipientUsername { get; set; }
    }
}
