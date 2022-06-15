using System;
using System.Collections.Generic;

#nullable disable

namespace DAL.Models
{
    public partial class RatingTbl
    {
        public short RatingId { get; set; }
        public short UserId { get; set; }
        public short SongId { get; set; }
        public int? RatingByMusical { get; set; }
        public int? RatingByMatchSong { get; set; }
        public int? RatingByMatchShow { get; set; }
        public int RatingFinal { get; set; }
        public string RatingExplanation { get; set; }

        public virtual SongTbl Song { get; set; }
        public virtual UserTbl User { get; set; }
    }
}
