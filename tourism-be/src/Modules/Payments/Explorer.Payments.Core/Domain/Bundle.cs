using Explorer.BuildingBlocks.Core.Domain;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Explorer.Payments.Core.Domain
{
    public class Bundle : Entity
    {
        public string Name { get; init; }
        public string Price { get; init; }
        public int AuthorId { get; init; }
        public List<int> ToursId { get; init; }
        public int BundleState { get; init; }

        public Bundle(string name, string price, int authorId, List<int> toursId, int bundleState)
        {
            if (authorId == 0) throw new ArgumentException("Invalid authorId.");
            Name = name;
            Price = price;
            AuthorId = authorId;
            ToursId = toursId;
            BundleState = bundleState;
        }

    }
}
