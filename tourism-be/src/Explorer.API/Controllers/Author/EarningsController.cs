using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using FluentResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Author
{
    [Authorize(Policy = "authorPolicy")]
    [Route("api/author/earnings")]
    public class EarningsController: BaseApiController
    {
        

        private readonly IAuthorEarningsService _authorEarningsService;

        public EarningsController(IAuthorEarningsService authorEarningsService)
        {
            _authorEarningsService = authorEarningsService;
        }
        [HttpGet("{authorId:int}")]
        public ActionResult<PagedResult<AuthorEarningsDto>> Get(int authorId)
        {
            var result = _authorEarningsService.CalculateEarningsByTours(authorId);
            return CreateResponse(result);
        }
        [HttpGet("total/{authorId:int}")]
        public ActionResult<Result<AuthorEarningsDto>> GetTotalEarnings(int authorId)
        {
            var result = _authorEarningsService.CalculateTotalEarnings(authorId);
            return CreateResponse(result);
        }
    }
}
