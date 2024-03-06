using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Tours.API.Dtos;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Administrator.Administration
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administration/userInformation")]
    public class UserInformationController:BaseApiController
    {
        private readonly IUserInformationService _userInformationService;
        private readonly IPersonInformationService _personInformationService;
        private readonly IUserActivityService _userActivityService;
        private readonly IWalletService _walletService;

        public UserInformationController(IUserInformationService userInformationService, IPersonInformationService personInformationService, IUserActivityService userActivityService,IWalletService walletService)
        {
            _userInformationService = userInformationService;
            _personInformationService = personInformationService;
            _userActivityService = userActivityService;
            _walletService = walletService;
        }


        [HttpGet]
        public ActionResult<PagedResult<UserInformationDto>> GetPaged([FromQuery] int page, [FromQuery] int pageSize)
        {
            var userResult = _userInformationService.GetPaged(page, pageSize);
            var personResult = _personInformationService.GetPaged(page, pageSize);
            var wallets = _walletService.GetAll();
            _userInformationService.Join(userResult, personResult);

            userResult.Value.Results.ForEach(user => 
                user.Balance = wallets.Value
                                      .Where(wallet => wallet.UserId == user.UserId)
                                      .FirstOrDefault(new WalletDto()).Balance    
            );

            return CreateResponse(userResult);
        }

        [HttpPut]
        public ActionResult<UserDto> Update(UserDto user)
        {
            var result = _userActivityService.Update(_userActivityService.Block(user).Value);
            return CreateResponse(result);
        }

        [HttpPut("addToBalance")]
        public ActionResult AddToBalance([FromQuery] int userId, [FromQuery] int coins)
        {
            return CreateResponse(_walletService.AddToBallance(userId, coins));
        }
    }
}
