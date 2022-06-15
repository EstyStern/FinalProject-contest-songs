using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class SongDTO
    {
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
        //משתנים מסוג משתמש
        public string UserFirstName { get; set; }
        public string UserLastName { get; set; }
        public string UserGenre { get; set; }
        //הוספת משתנה מטבלת זמרים
        public string? SingerImg { get; set; }


    }
}
