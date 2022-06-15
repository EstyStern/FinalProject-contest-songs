using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class StepInPlanDTO
    {
        public short StepInPlanId { get; set; }
        public short PlanId { get; set; }
        public DateTime StepInPlanStartDate { get; set; }
        public DateTime StepInPlanEndDateToUploadSong { get; set; }
        public DateTime StepInPlanEndDateToJudg { get; set; }
        public DateTime StepInPlanEndDateToRating { get; set; }
        public int? StepInPlanPart { get; set; }
        //הוספת משתנים שנמצאים בטבלת  תוכניות 
        public string PlanName { get; set; }

    }
}
