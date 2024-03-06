using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Dtos
{
    public class BundleDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int AuthorId { get; set; }
        public List<int> ToursId { get; set; }
        public int BundleState { get; set; }
    }
}
