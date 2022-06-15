using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class JudgeTbl
    {
        public short JudgeId { get; set; }
        public short UserId { get; set; }
        public string JudgeResume { get; set; }
        public string JudgeType { get; set; }
        public string JudgeCancalingReason { get; set; }
        public string JudgePic { get; set; }

        public virtual UserTbl User { get; set; }
    }
}
