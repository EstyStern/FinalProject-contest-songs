using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class UserDTO
    {
        public short UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserPass { get; set; }
        public string UserEmail { get; set; }
        public string UserCity { get; set; }
        public DateTime? UserBirthDate { get; set; }
        public string UserGender { get; set; }
        public string UserGenre { get; set; }
        //משתנה שמגדיר מאיזה סוג המשתמש 
        public int? TypeOfUser { get; set; }
    }
}
