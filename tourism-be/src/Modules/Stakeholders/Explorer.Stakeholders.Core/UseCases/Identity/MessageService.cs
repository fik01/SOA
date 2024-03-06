using AutoMapper;
using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Internal;
using Explorer.Stakeholders.API.Public.Identity;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using FluentResults;

namespace Explorer.Stakeholders.Core.UseCases.Identity
{
    public class MessageService : BaseService<MessageDto, Message>, IMessageService
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserNames _userNamesService;
        public MessageService(IMapper mapper, IMessageRepository messageRepository, IUserNames userNamesService) : base(mapper)
        {
            _messageRepository = messageRepository;
            _userNamesService = userNamesService;
        }

        public Result<MessageDto> Create(MessageDto message)
        {
            try
            {
                var result = _messageRepository.Create(MapToDomain(message));
                return MapToDto(result);
            }
            catch (ArgumentException e)
            {
                return Result.Fail(FailureCode.InvalidArgument).WithError(e.Message);
            }
        }

        public Result<PagedResult<MessageDto>> GetAll(int page, int pageSize)
        {
            var result = _messageRepository.GetPaged(page, pageSize);
            return MapToDto(result);
        }

        public void FindNames(List<MessageDto> result) 
        {
            var messages = _messageRepository.GetPaged(0, 0).Results;

            foreach (var r in result)
            {
                long recipientId = messages.Find(m => m.RecipientId == r.RecipientId).RecipientId;
                long senderId = messages.Find(m => m.SenderId == r.SenderId).SenderId;
                r.RecipientUsername = _userNamesService.GetName(recipientId).Username;
                r.SenderUsername = _userNamesService.GetName(senderId).Username;
                
            }
        }

        public Result Delete(int messageId)
        {
            try
            {
                _messageRepository.Delete(messageId);
                return Result.Ok();
            }
            catch (KeyNotFoundException e)
            {
                return Result.Fail(FailureCode.NotFound).WithError(e.Message);
            }
        }
    }
}
