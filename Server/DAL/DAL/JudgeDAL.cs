using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class JudgeDAL:IJudgeDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public JudgeDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל השופטים 

        public List<JudgeTbl> GetAllJudges()
        {
            return _DB.JudgeTbls.Include(a => a.User).ToList();
        }
        //פונקציה שמחזירה שופט על ידי קוד משתמש 
        public JudgeTbl GetJudgeById(int idUser)
        {
            var J = _DB.JudgeTbls.FirstOrDefault(j => j.UserId == idUser);
            if (J != null)
                return J;
            else
                return null;
        }
    }
}
