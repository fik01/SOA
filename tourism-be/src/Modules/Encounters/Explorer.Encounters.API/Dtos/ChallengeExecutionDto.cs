
namespace Explorer.Encounters.API.Dtos
{
    public class ChallengeExecutionDto
    {
        public long Id { get; set; }
        public long TouristId { get; set; }
        public ChallengeDto? Challenge { get; set; }
        public long ChallengeId { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime ActivationTime { get; set; }
        public DateTime? CompletionTime { get; set; }
        public bool IsCompleted { get; set; }
    }
}
