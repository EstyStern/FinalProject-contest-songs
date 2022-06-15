using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class PlanDAL:IPlanDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public PlanDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל התכניות 

        public List<PlanTbl> GetAllPlans()
        {
            return _DB.PlanTbls.Include(a => a.TypePlan).Include(p=>p.StepInPlanTbls).ToList();
        }


        //הוספת  תוכנית 
        public List<PlanTbl> AddPlan(PlanTbl t)
        {
            try
            {
                _DB.PlanTbls.Add(t);
                _DB.SaveChanges();
                return _DB.PlanTbls.Include(a => a.TypePlan).Include(p => p.StepInPlanTbls).ToList();
            }
            catch
            {
                throw new Exception("faild!-add plan");
            }

        }

        //עדכון תוכנית ברשימה
        public List<PlanTbl> UpdatePlan(PlanTbl p)
        {
            var planToEdit = _DB.PlanTbls.FirstOrDefault(a => a.PlanId == p.PlanId);
            if (planToEdit != null)
            {
                planToEdit.PlanId =p.PlanId;
                planToEdit.PlanName = p.PlanName;
                planToEdit.PlanStartDate = p.PlanStartDate;
                planToEdit.TypePlan = p.TypePlan;
                planToEdit.TypePlanId = p.TypePlanId;
                planToEdit.Pic = p.Pic;
                //??
                //planToEdit.JudgForPlanTbls = p.JudgForPlanTbls;
                //planToEdit.StepInPlanTbls = p.StepInPlanTbls;
                _DB.SaveChanges();
                return _DB.PlanTbls.ToList();
            }
            return null;
        }
    }
}
