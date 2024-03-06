using Explorer.Tours.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Tours.API.Public
{
    public interface IPreferencesService
    {
        Result<PreferencesDto> Create(PreferencesDto preferences);
        Result<PreferencesDto> GetByUserId(long userId);
        Result Delete(int id);
    }
}
