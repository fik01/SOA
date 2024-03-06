using AutoMapper;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Core.Domain;
using Explorer.BuildingBlocks.Core.Domain;
using AutoMapper.Configuration.Conventions;
using Explorer.Stakeholders.Core.Domain.Followers;


namespace Explorer.Stakeholders.Core.Mappers;

public class StakeholderProfile : Profile
{
    public StakeholderProfile()
    {
        CreateMap<ApplicationRatingDto, ApplicationRating>().ReverseMap();
        CreateMap<UserInformationDto, User>().ReverseMap().ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString())).ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id));
        CreateMap<UserInformationDto, Person>().ReverseMap();
        CreateMap<PersonDto, Person>().ReverseMap();
        CreateMap<ClubDto, Club>().ReverseMap();
        CreateMap<JoinRequestDto, JoinRequest>().ReverseMap();
        CreateMap<UserDto, User>().ReverseMap().ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));
        CreateMap<UserNamesDto, User>().ReverseMap();
        CreateMap<MessageDto, Message>().ReverseMap();
        CreateMap<Follower, FollowerDto>().ReverseMap();
        CreateMap<FollowerNotificationDto, FollowerNotification>().ReverseMap();
        CreateMap<FollowerDto, Follower>().IncludeAllDerived()
            .ForMember(dest => dest.Notification, opt => opt.MapFrom(src => new FollowerNotification(src.Notification.Content, src.Notification.TimeOfArrival, src.Notification.Read)));
        CreateMap<Follower, FollowerDto>().IncludeAllDerived()
            .ForMember(dest => dest.Notification, opt => opt.MapFrom(src => src.Notification));
        CreateMap<UserNewsDto, UserNews>().ReverseMap();
    }
}