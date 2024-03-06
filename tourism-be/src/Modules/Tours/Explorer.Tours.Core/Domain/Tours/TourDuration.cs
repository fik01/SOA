using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Explorer.Tours.Core.Domain.Tours
{
    public class TourDuration : ValueObject
    {
        public uint TimeInSeconds { get; init; }
        public TransportationType Transportation { get; init; }

        [JsonConstructor]
        public TourDuration(uint timeInSeconds, TransportationType transportation)
        {
            TimeInSeconds = timeInSeconds;
            Transportation = transportation;
        }
        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return TimeInSeconds;
            yield return Transportation;
        }
    }
    public enum TransportationType
    {
        Walking,
        Bicycle,
        Car
    }
}
