using Explorer.Tours.API.Dtos.Statistics;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.ServiceInterfaces;
using Explorer.Tours.Core.Domain.Sessions;
using Explorer.Tours.Core.Domain.Tours;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Explorer.Tours.Core.UseCases.Authoring
{
    public class TourStatisticsDomainService : ITourStatisticsDomainService
    {

        public TourStatisticsDomainService()
        {
        }

        public List<TourStatistics> CalculateAbandonedStatistics(List<Session> sessions)
        {
            var abandonedStatistics = new List<TourStatistics>();

            foreach (var session in sessions)
            {
                var matchingStat = abandonedStatistics.FirstOrDefault(stat => stat.TourId == session.TourId);

                if (session.SessionStatus == SessionStatus.ABANDONED)
                {
                    if (matchingStat != null)
                    {
                        matchingStat.NumberOfStats += 1;
                    }
                    else
                    {
                        TourStatistics stat = new TourStatistics(session.TourId, 1);
                        abandonedStatistics.Add(stat);
                    }
                }
            }

            return abandonedStatistics;
        }

        public List<TourStatistics> CalculateAttendanceStatistics(List<Session> sessions)
        {
            var attendanceStatistics = new List<TourStatistics>();

            foreach (var session in sessions)
            {
                var matchingStat = attendanceStatistics.FirstOrDefault(stat => stat.TourId == session.TourId);


                if (session.SessionStatus == SessionStatus.ACTIVE || session.SessionStatus == SessionStatus.COMPLETED)
                {
                    if (matchingStat != null)
                    {
                        matchingStat.NumberOfStats += 1;
                    }
                    else
                    {
                        TourStatistics stat = new TourStatistics(session.TourId, 1);
                        //stat.TourId = session.TourId;
                        //stat.NumberOfStats = 1;
                        attendanceStatistics.Add(stat);
                    }
                }
            }

            return attendanceStatistics;
        }

        public List<TourStatistics> CalculateBestRatedStatisticts(List<TourRating> ratings)
        {
            var bestRatedToursStats = new List<TourStatistics>();
            var tourIdToRatingSum = new Dictionary<long, double>();
            var tourIdToRatingCount = new Dictionary<long, int>();

            foreach (var rating in ratings)
            {
                if (tourIdToRatingSum.ContainsKey(rating.TourId))
                {
                    tourIdToRatingSum[rating.TourId] += rating.Mark;
                    tourIdToRatingCount[rating.TourId]++;
                }
                else
                {
                    tourIdToRatingSum[rating.TourId] = rating.Mark;
                    tourIdToRatingCount[rating.TourId] = 1;
                }
            }

            foreach (var tourId in tourIdToRatingSum.Keys)
            {
                var avgRating = tourIdToRatingSum[tourId] / tourIdToRatingCount[tourId];
                TourStatistics stat = new TourStatistics(tourId, avgRating);

                bestRatedToursStats.Add(stat);
            }

            return bestRatedToursStats;
        }

        public int CalculateNumberOfCompletedTours(List<Session> sessions, List<long> authorsTourIds)
        {
            int numberOfCompletedTours = 0;
            var uniqueSessions = new List<Session>();
            foreach (var session in sessions)
            {
                if (authorsTourIds.Contains(session.TourId))
                {
                    if (uniqueSessions.FirstOrDefault(s => s.TouristId == session.TouristId && s.TourId == session.TourId) == null && session.SessionStatus == SessionStatus.COMPLETED)
                    {
                        numberOfCompletedTours += 1;
                        uniqueSessions.Add(session);
                    }
                }
            }

            return numberOfCompletedTours;
        }

        public int CalculateNumberOfStartedTours(List<Session> sessions, List<long> authorsTourIds)
        {
            int numberOfStartedTours = 0;
            var uniqueSessions = new List<Session>();
            foreach (var session in sessions)
            {
                if(authorsTourIds.Contains(session.TourId))
                {
                    if(uniqueSessions.FirstOrDefault(s => s.TouristId == session.TouristId && s.TourId == session.TourId) == null)
                    {
                        numberOfStartedTours += 1;
                        uniqueSessions.Add(session);
                    }
                }
            }

            return numberOfStartedTours;
        }

        public Result<TourStatistics> GetSessionsByStatusForTourStatistics(int tourId, int sessionStatus, List<Session> sessions)
        {
            int number = 0;
            TourStatistics stat = new TourStatistics(tourId, number);
            SessionStatus status;

            switch (sessionStatus)
            {
                case 0:
                    status = SessionStatus.ACTIVE;
                    break;
                case 1:
                    status = SessionStatus.COMPLETED;
                    break;
                case 2:
                    status = SessionStatus.ABANDONED;
                    break;
                default:
                    return null;
            }
            foreach (var session in sessions)
            {

                if (session.TourId == tourId && session.SessionStatus == status)
                {
                    number++;
                }
            }
            stat.NumberOfStats = number;
            return stat;
        }

        public Result<TourStatistics> GetNumberSessionsByTour(int tourId, List<Session> sessions)
        {
            int number = 0;
            TourStatistics stat = new TourStatistics(tourId, number);
            foreach (var session in sessions)
            {

                if (session.TourId == tourId)
                {
                    number++;
                }
            }
            stat.NumberOfStats = number;
            return stat;
        }

        public Result<TourStatistics> GetStatisticsForCompletedKeypointOnTour(int tourId, int keyPointId, List<Session> sessions)
        {
            int number = 0;
            int numberOfSession = 0;
            TourStatistics stat = new TourStatistics(tourId, number);
            foreach (var session in sessions)
            {
                if (session.TourId == tourId)
                {
                    numberOfSession++;
                }
                if (session.TourId == tourId && session.CompletedKeyPoints.Any(cp => cp.KeyPointId == keyPointId))
                {
                    number++;
                }
            }
            stat.NumberOfStats = (double)number/numberOfSession * 100;
            return stat;
        }

        public List<int> CalculateTourCompletionPercentage(List<Session> sessions, List<long> authorsTourIds)
        {
            int firstQuarterCounter = 0;
            int secondQuarterCounter = 0;
            int thirdQuarterCounter = 0;
            int fourthQuarterCounter = 0;

            var percentages = new List<int>();

            var uniqueSessions = new List<Session>();

            uniqueSessions = sessions
                .GroupBy(s => new { s.TouristId, s.TourId })
                .Select(group => group.OrderByDescending(s => s.DistanceCrossedPercent).First())
                .ToList();


            foreach (var session in uniqueSessions)
            {
                if (authorsTourIds.Contains(session.TourId))
                {
                    if (session.DistanceCrossedPercent < 25)
                    {
                        firstQuarterCounter++;
                    }
                    else if (session.DistanceCrossedPercent >= 25 && session.DistanceCrossedPercent < 50)
                    {
                        secondQuarterCounter++;
                    }
                    else if(session.DistanceCrossedPercent >= 50 && session.DistanceCrossedPercent < 75)
                    {
                        thirdQuarterCounter++;
                    }
                    else
                    {
                        fourthQuarterCounter++;
                    }
                }
            }

            percentages.Add(firstQuarterCounter);
            percentages.Add(secondQuarterCounter);
            percentages.Add(thirdQuarterCounter);
            percentages.Add(fourthQuarterCounter);

            return percentages;
        }
    }
}
