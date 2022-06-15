using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class SingerDTO

    {
        public short SingerId { get; set; }
        public short UserId { get; set; }
        public string SingerResume { get; set; }
        public string SingerStatus { get; set; }
        public string SingerImg { get; set; }
        public string SingerCancalingReason { get; set; }
        //הוספת משתנים שנמצאים בטבלת משתמשים 
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserGenre { get; set; }
    }
}
