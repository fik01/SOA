using Explorer.BuildingBlocks.Core.Domain;

namespace Explorer.Tours.Core.Domain

{
    public class Preferences : Entity
    {
        public long UserId { get; init; }
        public int DifficultyLevel { get; init; }
        public int WalkingRate { get; init; }
        public int BicycleRate { get; init; }
        public int CarRate { get; init; }
        public int BoatRate { get; init; }
        public List<string> Tags { get; init; }

        public Preferences(long userId, int difficultyLevel, int walkingRate, int bicycleRate, int carRate, int boatRate, List<string> tags)
        {
            UserId = userId;
            DifficultyLevel = difficultyLevel;
            WalkingRate = walkingRate;
            BicycleRate = bicycleRate;
            CarRate = carRate;
            BoatRate = boatRate;
            Tags = tags;
            Validate();
        }

        public void Validate()
        {
            if (UserId == 0) throw new ArgumentException("Invalid UserId");
            if (DifficultyLevel < 1 || DifficultyLevel > 5) throw new ArgumentException("Invalid difficulty level");
            if (WalkingRate < 0 || WalkingRate > 3) throw new ArgumentException("Invalid walking rate");
            if (BicycleRate < 0 || BicycleRate > 3) throw new ArgumentException("Invalid bicycle rate");
            if (CarRate < 0 || CarRate > 3) throw new ArgumentException("Invalid car rate");
            if (BoatRate < 0 || BoatRate > 3) throw new ArgumentException("Invalid boat rate");
        }
    }
}

