using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class RatingDAL:IRatingDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public RatingDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמוסיפה דרוג ומחזירה את כל הדרוגים 
        public List<RatingTbl> AddRating(RatingTbl r)
        {
            _DB.RatingTbls.Add(r);
            _DB.SaveChanges();
            return _DB.RatingTbls.Include(a => a.User).Include(a => a.Song).ToList();
        }
        //פונקציה שמחזירה את כל הדרוגים 

        public List<RatingTbl> GetAllRatings()
        {
            return _DB.RatingTbls.Include(a => a.User).Include(a => a.Song).ToList();
        }
        //פונקציה שמביאה את כל הדרוגים של שיר מסוים
        public List<RatingTbl> GetAllRatingsByIdSong(int id)
        {
            return _DB.RatingTbls.Where(p=>p.SongId== id).Include(a => a.User).Include(a => a.Song).ToList();
        }
        //פונקצייה שבודקת האם המשתמש דירג כבר את השיר הנוכחי
        public bool ReturnIfThisUserRatingThisSong(int song, int user)
        {
            List<RatingTbl> list = _DB.RatingTbls.Where(y => y.SongId == song && y.UserId == user).ToList();
            if (list.Count() == 0)
                return false;
            return true;
        }
    }
}
