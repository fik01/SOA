using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Tours.API.Dtos;
using Explorer.Tours.API.Public;
using Explorer.Tours.Core.Domain;
using Explorer.Tours.Core.Domain.RepositoryInterfaces;
using FluentResults;


namespace Explorer.Tours.Core.UseCases;
public class PreferencesService : CrudService<PreferencesDto, Preferences>, IPreferencesService
{
    private readonly IPreferencesRepository _preferencesRepository;
    private readonly IMapper _mapper;
    public PreferencesService(ICrudRepository<Preferences> repository, IPreferencesRepository preferencesRepository, IMapper mapper) : base(repository, mapper) {
        _preferencesRepository = preferencesRepository;
        _mapper = mapper;
    }

    public Result<PreferencesDto> GetByUserId(long userId)
    {
        var result = _preferencesRepository.GetByUserId(userId);
        return MapToDto(result);
    }
}

