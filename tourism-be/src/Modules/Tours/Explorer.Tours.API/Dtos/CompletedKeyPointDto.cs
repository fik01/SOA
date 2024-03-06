using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos
{
    public class CompletedKeyPointDto
    {
        public int KeyPointId { get; set; }
        public DateTime CompletionTime { get; set; }
    }
}
