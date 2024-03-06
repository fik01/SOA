using Explorer.Blog.Core.Domain;
using Explorer.BuildingBlocks.Core.Domain;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Explorer.Tours.Core.Domain
{ 
    public enum TourProblemPriority
    {
        LOW = 0,
        MEDIUM,
        HIGH
    }
    public enum TourProblemCategory
    {
        BOOKING =0,
        ITINERARY,
        PAYMENT,
        TRANSPORTATION,
        GUIDE_SERVICES,
        OTHER
    }
    public class TourProblem : Entity
    {
        public long TouristId { get; init; }
        public long TourId { get; init; }
        public TourProblemCategory Category { get; init; }
        public TourProblemPriority Priority { get; init; }
        public string Description { get; init; }
        public DateTime Time { get; init; }
        public Boolean IsSolved { get; private set; }      
        public List<TourProblemMessage> Messages { get; init; }
        public DateTime? Deadline { get; private set; }


        public TourProblem(long touristId,long tourId, TourProblemCategory category, TourProblemPriority priority, string description, DateTime time, bool isSolved, List<TourProblemMessage> messages)
        {
            TouristId = touristId;
            TourId = tourId;
            Category = category;
            Priority = priority;
            Description = description;
            Time = time;
            Validate();
            IsSolved = isSolved;
            Messages = messages;
        }
        public TourProblemMessage CreateMessage(long senderId,long recipientId, DateTime time, string description,bool isRead)
        {
            TourProblemMessage message = new TourProblemMessage(senderId, recipientId, time, description, isRead);
            Messages.Add(message);
            return message;
        }
        public void Validate()
        {
            if (string.IsNullOrWhiteSpace(Category.ToString())) throw new ArgumentException("Invalid Category.");
            if (string.IsNullOrWhiteSpace(Priority.ToString())) throw new ArgumentException("Invalid Priority.");
            if (string.IsNullOrWhiteSpace(Description)) throw new ArgumentException("Invalid Description.");
            if (string.IsNullOrWhiteSpace(Time.ToString())) throw new ArgumentException("Invalid Time.");
        }
        public void GiveDeadline(DateTime deadline)
        {
            if (deadline > DateTime.Now)
                this.Deadline = deadline;
            else
                throw new ArgumentException("Invalid date!");
        }
        public void CloseProblem()
        {
            this.IsSolved = true;
        }
    }
}