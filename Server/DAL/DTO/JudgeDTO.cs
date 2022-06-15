using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class JudgeDTO
    {
       
        
        public short JudgeId { get; set; }
        public short UserId { get; set; }
        public string JudgeResume { get; set; }
        public string JudgeType { get; set; }
        public string JudgeCancalingReason { get; set; }
        public string JudgePic { get; set; }
        //הוספת משתנים שנמצאים בטבלת משתמשים 
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        
        
    }
}
