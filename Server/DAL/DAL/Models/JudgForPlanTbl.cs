using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class JudgForPlanTbl
    {
        public short JudgForPlanId { get; set; }
        public short UserId { get; set; }
        public short PlanId { get; set; }

        public virtual PlanTbl Plan { get; set; }
        public virtual UserTbl User { get; set; }
    }
}
