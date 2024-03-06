using Explorer.BuildingBlocks.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Explorer.Payments.Core.Domain.DomainEvents
{
    public class CouponUsed : Entity
    {
        public string Code { get; private set; }
        public DateTime DateOfUsing { get; private set; }

        public CouponUsed(string code, DateTime dateOfUsing)
        {
            Code = code;
            DateOfUsing = dateOfUsing;
        }
    }    
}
