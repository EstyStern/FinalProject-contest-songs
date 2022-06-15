using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class SingerTbl
    {
        public short SingerId { get; set; }
        public short UserId { get; set; }
        public string SingerResume { get; set; }
        public string SingerStatus { get; set; }
        public string SingerImg { get; set; }
        public string SingerCancalingReason { get; set; }

        public virtual UserTbl User { get; set; }
    }
}
