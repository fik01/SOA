using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using FluentResults;

namespace Explorer.Stakeholders.API.Public.Identity
{
    public interface IMessageService
    {
        Result<MessageDto> Create(MessageDto message);
        Result<PagedResult<MessageDto>> GetAll(int page, int pageSize);
        public void FindNames(List<MessageDto> result);
        public Result Delete(int messageId);
    }
}
