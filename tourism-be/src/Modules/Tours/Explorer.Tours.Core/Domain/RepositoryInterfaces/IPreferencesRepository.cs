
using Explorer.Tours.Core.Domain;

namespace Explorer.Tours.Core.Domain.RepositoryInterfaces
{
    public interface IPreferencesRepository
    {
        Preferences? GetByUserId(long userId); 
    }
}
