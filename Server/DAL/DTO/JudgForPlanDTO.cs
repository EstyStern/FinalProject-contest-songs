using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class JudgForPlanDTO
    {
        public short JudgForPlanId { get; set; }
        public short UserId { get; set; }
        public short PlanId { get; set; }
        //הוספת משתנה מטבלת שופטים
        public string ?JudgePic { get; set; }
        //הוספת משתנים שנמצאים בטבלת משתמשים 
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }

    }
}
