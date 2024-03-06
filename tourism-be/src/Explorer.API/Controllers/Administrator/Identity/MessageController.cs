using Explorer.Blog.API.Dtos;
using Explorer.Blog.API.Public;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public.Identity;
using Explorer.Tours.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Administrator.Identity
{
    [Authorize(Policy = "administratorPolicy")]
    [Route("api/administrator/messages")]
    public class MessageController : BaseApiController
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpPost]
        public ActionResult<CommentDto> Create([FromBody] MessageDto messageDto)
        {
            var result = _messageService.Create(messageDto);
            return CreateResponse(result);
        }

        [HttpGet]
        public ActionResult<PagedResult<TourProblemDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize) 
        {
            var result = _messageService.GetAll(page, pageSize);
            _messageService.FindNames(result.Value.Results);
            return CreateResponse(result);
        }
    }
}
