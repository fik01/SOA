using Explorer.Encounters.API.Dtos;
using Explorer.Encounters.API.Internal;
using Explorer.Encounters.API.Public;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers;

[Route("api/users")]
public class AuthenticationController : BaseApiController
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IWalletService _walletService;
    private readonly IUserExperienceService _userExperienceService;

    public AuthenticationController(IAuthenticationService authenticationService, IWalletService walletService, IUserExperienceService userExperienceService)
    {
        _authenticationService = authenticationService;
        _walletService = walletService;
        _userExperienceService = userExperienceService;
    }

    [HttpPost]
    public ActionResult<AuthenticationTokensDto> RegisterTourist([FromBody] AccountRegistrationDto account)
    {
        var result = _authenticationService.RegisterTourist(account);

        WalletDto wallet = new WalletDto(result.Value.Id, 0);
        _walletService.Create(wallet);
        UserExperienceDto userExperience = new UserExperienceDto(result.Value.Id, 0, 1);
        _userExperienceService.Create(userExperience);
        return CreateResponse(result);
    }

    [HttpPost("login")]
    public ActionResult<AuthenticationTokensDto> Login([FromBody] CredentialsDto credentials)
    {
        var result = _authenticationService.Login(credentials);
        return CreateResponse(result);
    }

    [HttpPost("changePasswordRequest")]
    public ActionResult<string> ChangePasswordRequest([FromQuery] string email)
    {
        try
        {
            var result = _authenticationService.ChangePasswordRequest(email);

            if (result.IsFailed)
            {
                var errorResponse = new
                {
                    ErrorMessage = "Request failed",
                    Errors = result.Errors.Select(error => error.Message), // Include all error messages
                    Success = false
                };

                return BadRequest(errorResponse);
            }

            var response = new { Message = result, Success = true };
            return Ok(response);
        }
        catch (Exception ex)
        {
            var errorResponse = new { ErrorMessage = ex.Message, Success = false };
            return BadRequest(errorResponse);
        }
    }

    [HttpPost("changePassword")]
    public ActionResult<string> ChangePassword([FromBody] ChangePasswordDto changePassword)
    {
        try
        {
            var result = _authenticationService.ChangePassword(changePassword);
            if (result.IsFailed)
            {
                var errorResponse = new
                {
                    ErrorMessage = "Request failed",
                    Errors = result.Errors.Select(error => error.Message),
                    Success = false
                };

                return BadRequest(errorResponse);
            }
            var response = new { Message = result, Success = true };
            return Ok(response);
        }
        catch (Exception ex)
        {
            var errorResponse = new { ErrorMessage = ex.Message, Success = false };
            return BadRequest(errorResponse);
        }

    }

    [HttpPost("activateUser")]
    public ActionResult<AuthenticationTokensDto> ActivateUser([FromQuery] string token)
    {
        try
        {
            var result = _authenticationService.ActivateUser(token);
            return CreateResponse(result);
        }
        catch (Exception ex)
        {
            var errorResponse = new { ErrorMessage = ex.Message, Success = false };
            return BadRequest(errorResponse);
        }

    }
}