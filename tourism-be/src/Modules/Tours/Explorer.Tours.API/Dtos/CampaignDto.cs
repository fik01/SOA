using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos
{
    public class CampaignDto
    {
        public List<TourDto> Tours { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TouristId { get; set; }
    }
}
