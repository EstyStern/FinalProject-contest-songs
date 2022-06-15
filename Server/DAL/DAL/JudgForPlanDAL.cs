using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class JudgForPlanDAL:IJudgForPlanDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public JudgForPlanDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל השופטים של כל התוכנית  

        public List<JudgForPlanTbl> GetAllJudgForPlans()
        {
            return _DB.JudgForPlanTbls.Include(a => a.User).Include(e=>e.User.JudgeTbls).ToList();
        }


        //הוספת  שופט 
        public List<JudgForPlanTbl> AddJudge(JudgForPlanTbl t)
        {
            try
            {
                _DB.JudgForPlanTbls.Add(t);
                _DB.SaveChanges();
                //return _DB.JudgForPlanTbls.Include(a => a.TypePlan)
                return _DB.JudgForPlanTbls.Include(a => a.User).Include(e => e.User.JudgForPlanTbls).ToList();
            }
            catch
            {
                throw new Exception("faild!-add plan");
            }

        }
    }
}
