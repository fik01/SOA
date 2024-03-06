using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using FluentResults;
using Explorer.Stakeholders.API.Internal;
using Explorer.Tours.API.Public.Authoring;


namespace Explorer.Tours.Core.UseCases
{
    public class TourProblemService : CrudService<TourProblemDto, TourProblem>, ITourProblemService
    {
        private readonly ITourProblemRepository _tourProblemRepository;
        private readonly IUserNames _userNamesService;
        private readonly ITourService _tourService;

        public TourProblemService(ICrudRepository<TourProblem> repository, IMapper mapper, ITourProblemRepository tourProblemRepository, IUserNames userNamesService, ITourService tourService) : base(repository, mapper)
        {
            _tourProblemRepository = tourProblemRepository;
            _userNamesService = userNamesService;
            _tourService = tourService;
        }
        public Result<List<TourProblemDto>> GetByTouristId(long touristId)
        {
            List<TourProblemDto> result = new List<TourProblemDto>();
            List<TourProblem> tourProblems = _tourProblemRepository.GetByTouristId(touristId);

            tourProblems.ForEach(t => result.Add(MapToDto(t)));

            return result;
        }
        public Result<List<TourProblemDto>> GetByAuthorId(long authorId)
        {
            var tours = _tourService.GetPaged(0, 0).Value.Results;
            List<TourProblemDto> result = new List<TourProblemDto>();
            List<TourProblem> tourProblems = new List<TourProblem>();
            foreach (var t in tours)
            {
                if (authorId == t.AuthorId)
                {
                    tourProblems.AddRange(_tourProblemRepository.GetByTourId(t.Id));
                }
            }
            tourProblems.ForEach(t => result.Add(MapToDto(t)));
            return result;
        }
        public void FindNames(List<TourProblemDto> result)
        {
            var tours = _tourService.GetPaged(0, 0).Value.Results;

            foreach (var r in result)
            {
                long authorId = tours.Find(t => t.Id == r.TourId).AuthorId;
                r.AuthorUsername = _userNamesService.GetName(authorId).Username;
                r.TouristUsername = _userNamesService.GetName(r.TouristId).Username;
                foreach (var m in r.Messages)
                {
                    if(m.SenderId != 0)
                        m.SenderName = _userNamesService.GetName(m.SenderId).Username;
                }
            }
        }

        public Result<List<TourProblemMessageDto>> GetUnreadMessages(long id)
        {
            var tourProblems = GetPaged(0, 0).Value.Results;
            FindNames(tourProblems);
            List<TourProblemMessageDto> unreadMessages = new List<TourProblemMessageDto>();

            foreach (var t in tourProblems)
            {
                foreach (var m in t.Messages)
                {
                    if (m.RecipientId == id && !m.IsRead)
                    {
                        unreadMessages.Add(m);
                    }
                }
            }
             return unreadMessages;
           
        }
        public Result<TourProblemDto> GiveDeadline(DateTime deadline, long tourProblemId)
        {
            var tourProblem = _tourProblemRepository.GiveDeadline(deadline, tourProblemId);
            TourProblemDto dto = new TourProblemDto();
            dto.Deadline=deadline;
            return dto;
        }

        public Result<TourProblemDto> PunishAuthor(string authorUsername, long tourId, long tourProblemId)
        {
            var tourProblem=_tourProblemRepository.PunishAuthor(authorUsername, tourId, tourProblemId);
            TourProblemDto tpdto= new TourProblemDto();
            tpdto.IsSolved = true;
            return tpdto;
        }
    }
}
