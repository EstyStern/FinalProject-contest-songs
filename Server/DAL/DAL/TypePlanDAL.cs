using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;


namespace DAL
{
    public class TypePlanDAL : ITypePlanDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public TypePlanDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל סוגי התוכניות 

        public List<TypePlanTbl> GetAllTypePlans()
        {
            return _DB.TypePlanTbls.ToList(); ;
        }

        //הוספת סוג תוכנית 
        public List<TypePlanTbl> AddTypePlan(TypePlanTbl t)
        {
            try
            {
                _DB.TypePlanTbls.Add(t);
                _DB.SaveChanges();
                return _DB.TypePlanTbls.ToList();
            }
            catch
            {
                throw new Exception("faild!-add type plan");
            }

        }
    }
}
