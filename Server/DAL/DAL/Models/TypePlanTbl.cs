using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class TypePlanTbl
    {
        public TypePlanTbl()
        {
            PlanTbls = new HashSet<PlanTbl>();
        }

        public short TypePlanId { get; set; }
        public string TypePlanName { get; set; }

        public virtual ICollection<PlanTbl> PlanTbls { get; set; }
    }
}
