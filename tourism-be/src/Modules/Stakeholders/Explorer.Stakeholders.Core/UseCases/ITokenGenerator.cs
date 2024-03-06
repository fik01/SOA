using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.Core.Domain;
using FluentResults;

namespace Explorer.Stakeholders.Core.UseCases;

public interface ITokenGenerator
{
    Result<AuthenticationTokensDto> GenerateAccessToken(User user, long personId);
    string GenerateResetPasswordToken(User user, long personId);
    string GenerateEmailVerificationToken(string email, string username);
    long GetUserIdFromToken(string jwtToken);
    DateTime GetTokenExpirationTime(string jwtToken);
    string GetUserEmailFromToken(string jwtToken);
}