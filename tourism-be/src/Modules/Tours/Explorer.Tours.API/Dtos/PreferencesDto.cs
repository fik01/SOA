using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Dtos
{
    public class PreferencesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int DifficultyLevel { get; set; }
        public int WalkingRate { get; set; }
        public int BicycleRate { get; set; }
        public int CarRate { get; set; }
        public int BoatRate { get; set; }
        public List<string> Tags { get; set; }
    }
}
