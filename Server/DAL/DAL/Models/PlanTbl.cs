using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class PlanTbl
    {
        public PlanTbl()
        {
            JudgForPlanTbls = new HashSet<JudgForPlanTbl>();
            StepInPlanTbls = new HashSet<StepInPlanTbl>();
        }

        public short PlanId { get; set; }
        public short TypePlanId { get; set; }
        public string PlanName { get; set; }
        public DateTime PlanStartDate { get; set; }
        public string Pic { get; set; }

        public virtual TypePlanTbl TypePlan { get; set; }
        public virtual ICollection<JudgForPlanTbl> JudgForPlanTbls { get; set; }
        public virtual ICollection<StepInPlanTbl> StepInPlanTbls { get; set; }
    }
}
