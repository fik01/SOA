using Explorer.BuildingBlocks.Core.Domain;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Explorer.Tours.Core.Domain
{
    public class TourRating : Entity
    {
        public long PersonId { get; init; }
        public long TourId { get; init; }
        public int Mark { get; private set; }
        public string Comment { get; private set; }
        public DateTime  DateOfVisit { get; private set; }
        public DateTime DateOfCommenting { get; private set; }
        public List<Uri> Images { get; private set; }

        public TourRating(long personId, long tourId, int mark, string comment, DateTime dateOfVisit, DateTime dateOfCommenting, List<Uri> images)
        {
            PersonId = personId;
            TourId = tourId;
            Mark = mark;
            Comment = comment;
            DateOfVisit = dateOfVisit;
            DateOfCommenting = dateOfCommenting;
            Images = images;
            Validate();
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(Mark.ToString()) || Mark < 1 || Mark > 5) throw new ArgumentException("Invalid Mark");
            if (string.IsNullOrWhiteSpace(Comment)) throw new ArgumentException("Invalid Comment");
            if (string.IsNullOrWhiteSpace(DateOfVisit.ToString())) throw new ArgumentException("Invalid DateOfVisit");
            if (string.IsNullOrWhiteSpace(DateOfCommenting.ToString())) throw new ArgumentException("Invalid DateOfCommenting");
            //if (Images.Count == 0) throw new ArgumentException("Invalid Images");
            if (PersonId == 0) throw new ArgumentException("Invalid PersonId");
        }
    }
}
