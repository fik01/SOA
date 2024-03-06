using AutoMapper;
using Explorer.Blog.API.Dtos;
using Explorer.Blog.Core.Domain;
using Explorer.BuildingBlocks.Core.Domain;
using System;

namespace Explorer.Blog.Core.Mappers;

public class BlogProfile : Profile
{
    public BlogProfile()
    {
        CreateMap<BlogDto, BlogPage>().ReverseMap();
        CreateMap<CommentDto, Comment>().ReverseMap();
        CreateMap<RatingDto, Rating>().ReverseMap();
        CreateMap<BlogDto, BlogPage>().IncludeAllDerived()
            .ForMember(dest => dest.Ratings, opt => opt.MapFrom(src => src.Ratings.Select((rating) => new Rating(rating.UserId,rating.CreationDate,rating.RatingValue))));
    }
}