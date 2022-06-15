using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class UserTbl
    {
        public UserTbl()
        {
            JudgForPlanTbls = new HashSet<JudgForPlanTbl>();
            JudgeTbls = new HashSet<JudgeTbl>();
            MessageTbls = new HashSet<MessageTbl>();
            RatingTbls = new HashSet<RatingTbl>();
            SingerTbls = new HashSet<SingerTbl>();
            SongTbls = new HashSet<SongTbl>();
        }

        public short UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserPass { get; set; }
        public string UserEmail { get; set; }
        public string UserCity { get; set; }
        public DateTime? UserBirthDate { get; set; }
        public string UserGender { get; set; }
        public string UserGenre { get; set; }

        public virtual ICollection<JudgForPlanTbl> JudgForPlanTbls { get; set; }
        public virtual ICollection<JudgeTbl> JudgeTbls { get; set; }
        public virtual ICollection<MessageTbl> MessageTbls { get; set; }
        public virtual ICollection<RatingTbl> RatingTbls { get; set; }
        public virtual ICollection<SingerTbl> SingerTbls { get; set; }
        public virtual ICollection<SongTbl> SongTbls { get; set; }
    }
}
