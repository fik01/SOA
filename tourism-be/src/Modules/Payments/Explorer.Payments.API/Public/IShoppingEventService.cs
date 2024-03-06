using Explorer.Payments.API.Dtos;
using FluentResults;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.API.Public
{
    public interface IShoppingEventService
    {
        Result<ShoppingEventDto> Create(ShoppingEventDto sales);
    }
}
