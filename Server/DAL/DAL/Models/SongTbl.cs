using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class SongTbl
    {
        public SongTbl()
        {
            RatingTbls = new HashSet<RatingTbl>();
        }

        public short SongId { get; set; }
        public short UserId { get; set; }
        public short StepInPlanId { get; set; }
        public string SongName { get; set; }
        public string SongFile { get; set; }
        public string SongChoosingReason { get; set; }
        public string SongComposer { get; set; }
        public string SongPrecessor { get; set; }
        public string SongStatus { get; set; }
        public string SongComment { get; set; }

        public virtual StepInPlanTbl StepInPlan { get; set; }
        public virtual UserTbl User { get; set; }
        public virtual ICollection<RatingTbl> RatingTbls { get; set; }
    }
}
