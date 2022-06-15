using System;
using System.Collections.Generic;
using System.Text;

namespace DTO
{
    public partial class RatingDTO
    {
        public short RatingId { get; set; }
        public short UserId { get; set; }
        public short SongId { get; set; }
        public int? RatingByMusical { get; set; }
        public int? RatingByMatchSong { get; set; }
        public int? RatingByMatchShow { get; set; }
        public int RatingFinal { get; set; }
        public string? RatingExplanation { get; set; }
        //משתנה מטבלת שירים
        public string? SongName { get; set; }

        //משתנים מטבלת משתמש
        public string? UserFirstName { get; set; }
        public string? UserLastName { get; set; }

    }
}
