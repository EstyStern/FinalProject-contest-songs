using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class MessageDTO
    {
        public short MessageId { get; set; }
        public short UserId { get; set; }
        public DateTime MessageDate { get; set; }
        public string MessageValue { get; set; }
        //הוספת משתנים שנמצאים בטבלת משתמשים 
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
    }
}
