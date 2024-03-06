using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Stakeholders.Core.Domain
{
    public class Club : Entity
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public Uri ClubPicture { get; private set; }
        public long TouristId { get; private set; }

        public Club(string name, string description, Uri clubPicture, long touristId)
        {
            if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("Invalid Name.");
            if (string.IsNullOrWhiteSpace(description)) throw new ArgumentException("Invalid Description.");
            if (clubPicture == null || !clubPicture.IsWellFormedOriginalString()) throw new ArgumentException("Invalid ClubPicture Uri.");

            Name = name;
            Description = description;
            ClubPicture = clubPicture;
            TouristId = touristId;
        }
    }
}
