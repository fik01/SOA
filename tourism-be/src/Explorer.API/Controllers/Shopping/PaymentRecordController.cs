using Explorer.BuildingBlocks.Core.UseCases;
using Explorer.Payments.API.Dtos;
using Explorer.Payments.API.Public;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Tours.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Explorer.API.Controllers.Shopping
{
    [Authorize(Policy = "touristPolicy")]
    [Route("api/tourist/paymentRecord")]
    public class PaymentRecordController : BaseApiController
    {
        private readonly IPaymentRecordService _paymentRecordService;

        public PaymentRecordController(IPaymentRecordService paymentRecordService)
        {
            _paymentRecordService = paymentRecordService;
        }

        [HttpGet]
        public ActionResult<PagedResult<PaymentRecordDto>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
        {
            var result = _paymentRecordService.GetPaged(page, pageSize);
            return CreateResponse(result);
        }

        [HttpPost]
        public ActionResult<PaymentRecordDto> Create([FromBody] PaymentRecordDto paymentRecord)
        {
            var result = _paymentRecordService.Create(paymentRecord);
            return CreateResponse(result);
        }
    }
}
