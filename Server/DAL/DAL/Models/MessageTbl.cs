using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class MessageTbl
    {
        public short MessageId { get; set; }
        public short UserId { get; set; }
        public DateTime MessageDate { get; set; }
        public string MessageValue { get; set; }

        public virtual UserTbl User { get; set; }
    }
}
