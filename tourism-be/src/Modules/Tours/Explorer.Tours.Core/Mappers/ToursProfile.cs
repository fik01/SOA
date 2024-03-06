using AutoMapper;
using Explorer.Blog.Core.Domain;
using Explorer.BuildingBlocks.Core.Domain;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.Tours;
using Explorer.Tours.Core.Domain.Sessions;
using System.ComponentModel.DataAnnotations;
using Explorer.Tours.API.Dtos.Statistics;

namespace Explorer.Tours.Core.Mappers;

public class ToursProfile : Profile
{
    public ToursProfile()
    {
        CreateMap<EquipmentDto, Equipment>().ReverseMap();
        CreateMap<TourDto, Tour>().ReverseMap();
        CreateMap<TourDurationDto, TourDuration>().ReverseMap();
        CreateMap<TourKeyPointDto, TourKeyPoint>().ReverseMap();
        CreateMap<TourRatingDto, TourRating>().ReverseMap();
        CreateMap<FacilityDto, Facility>().ReverseMap();
       // CreateMap<TourProblemDto, TourProblem>().ReverseMap();
        CreateMap<TourProblemMessageDto, TourProblemMessage>().ReverseMap();
        CreateMap<TourProblemDto, TourProblem>()
            .IncludeAllDerived()
            .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages.Select((dto) => new TourProblemMessage(dto.SenderId,dto.RecipientId, dto.CreationTime, dto.Description,dto.IsRead))));
        CreateMap<TourProblem, TourProblemDto>()
            .IncludeAllDerived()
            .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages.Select((message) => new TourProblemMessageDto { SenderId = message.SenderId, RecipientId = message.RecipientId, CreationTime = message.CreationTime, Description = message.Description,IsRead = message.IsRead })));


       
        CreateMap<PositionSimulatorDto, PositionSimulator>().ReverseMap();
        CreateMap<PreferencesDto, Preferences>().ReverseMap();
        CreateMap<CompletedKeyPointDto, CompletedKeyPoint>().ReverseMap();
        CreateMap<SessionDto, Session>().ReverseMap();
        CreateMap<SessionDto, Session>().IncludeAllDerived()
            .ForMember(dest => dest.CompletedKeyPoints, opt => opt.MapFrom(src => src.CompletedKeyPoints.Select((completedKeyPoint) => new CompletedKeyPoint(completedKeyPoint.KeyPointId, completedKeyPoint.CompletionTime))));


        CreateMap<EquipmentTrackingDto, EquipmentTracking>().ReverseMap();
        CreateMap<PublicTourKeyPointDto, PublicTourKeyPoints>().ReverseMap().ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        CreateMap<PublicFacilityDto, PublicFacility>().ReverseMap().ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()));
        CreateMap<TourStatisticsDto, TourStatisticsDto>().ReverseMap();
    }
}