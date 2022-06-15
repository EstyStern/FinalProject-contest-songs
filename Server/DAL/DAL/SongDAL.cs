using System;
using DAL.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class SongDAL : ISongDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public SongDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל השירים 



        List<SongTbl> ISongDAL.GetAllSongs()
        {
            return _DB.SongTbls.Include(e => e.User).ThenInclude(p => p.SingerTbls).Include(e => e.StepInPlan).Include(e => e.RatingTbls).ToList();
            //.Include(e => e.User.SingerTbls)
            //return _DB.SongTbls.ToList();
        }

        //הוספת שיר חדש
        public List<SongTbl> AddSong(SongTbl s)
        {
            try
            {
                _DB.SongTbls.Add(s);
                _DB.SaveChanges();
                return _DB.SongTbls.Include(e => e.User).ThenInclude(p => p.SingerTbls).Include(e => e.StepInPlan).ThenInclude(x => x.Plan).Include(e => e.RatingTbls).ToList();
            }
            catch
            {
                throw new Exception("faild!-add song");
            }

        }

    }
}
