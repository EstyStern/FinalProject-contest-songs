using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class PlanDTO
    {
        public short PlanId { get; set; }
        public short TypePlanId { get; set; }
        public string PlanName { get; set; }
        public DateTime PlanStartDate { get; set; }
        public string Pic { get; set; }

        //הוספת משתנים שנמצאים בטבלת סוג תוכנית 
        public string TypePlanName { get; set; }

        //הוספת משתנים שנמצאים בטבלת שלבי תוכנית 
        public short ? CurentStepInPlanId { get; set; }
    }
}
