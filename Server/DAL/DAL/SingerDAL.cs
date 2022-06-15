using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class SingerDAL:ISingerDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public SingerDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל הזמרים-מתמודדים 

        public List<SingerTbl> GetAllSingers()
        {
            var singer = _DB.SingerTbls.Include(a => a.User).Include(a=>a.User.MessageTbls).ToList();
            return singer;
        }
        //פונקציה שמחזירה זמר על ידי קוד משתמש 
        public SingerTbl GetSingerById(int idUser)
        {
            var S = _DB.SingerTbls.FirstOrDefault(s => s.UserId == idUser);
            if (S != null)
                return S;
            else
                return null;
        }
        //פונקציה שמעדכנת את הזמר

        public List<SingerTbl> UpdateSinger(SingerTbl s)
        {
                var singerToEdit = _DB.SingerTbls.FirstOrDefault(p => p.SingerId == s.SingerId);
                if (singerToEdit != null)
                {
                singerToEdit.SingerId = s.SingerId;
                singerToEdit.SingerImg = s.SingerImg;
                singerToEdit.SingerResume = s.SingerResume;
                singerToEdit.SingerCancalingReason = s.SingerCancalingReason;
                singerToEdit.SingerStatus = s.SingerStatus;
                singerToEdit.UserId = s.UserId;
                    _DB.SaveChanges();
                }
                return _DB.SingerTbls.ToList();
        }
        //פונקציה שמוסיפה את הזמר
        public List<SingerTbl> AddSinger(SingerTbl s)
        {
            _DB.SingerTbls.Add(s);
            _DB.SaveChanges();
            return _DB.SingerTbls.ToList();
        }
        //פונקציה שמוחקת את הזמר לפי קוד
        public List<SingerTbl> DeleateSinger(int SingerId)
        {
            _DB.SingerTbls.Remove(_DB.SingerTbls.FirstOrDefault(p => p.SingerId == SingerId));
            _DB.SaveChanges();
            return _DB.SingerTbls.ToList();
        }
    }
}
