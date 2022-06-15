using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class StepInPlanTbl
    {
        public StepInPlanTbl()
        {
            SongTbls = new HashSet<SongTbl>();
        }

        public short StepInPlanId { get; set; }
        public short PlanId { get; set; }
        public DateTime StepInPlanStartDate { get; set; }
        public DateTime StepInPlanEndDateToUploadSong { get; set; }
        public DateTime StepInPlanEndDateToJudg { get; set; }
        public DateTime StepInPlanEndDateToRating { get; set; }
        public int? StepInPlanPart { get; set; }

        public virtual PlanTbl Plan { get; set; }
        public virtual ICollection<SongTbl> SongTbls { get; set; }
    }
}
