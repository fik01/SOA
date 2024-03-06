using Explorer.Stakeholders.API.Dtos;
using FluentResults;

namespace Explorer.Stakeholders.API.Public;

public interface IAuthenticationService
{
    Result<AuthenticationTokensDto> Login(CredentialsDto credentials);
    Result<AuthenticationTokensDto> RegisterTourist(AccountRegistrationDto account);
    Result<string> ChangePasswordRequest(string password);

    Result<string> ChangePassword(ChangePasswordDto changePassword);

    Result<string> GetUsername(long id);
    Result<AuthenticationTokensDto> ActivateUser(string token);
}