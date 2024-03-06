using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Blog.API.Dtos
{
    public class CommentDto
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Username { get; set; }
        public Uri ProfilePic { get; set; }
        public DateTime CreationDate { get; set; }
        public string Description { get; set; }
        public DateTime LastEditDate { get; set; }
        public long BlogId { get; set; }
    }
}
