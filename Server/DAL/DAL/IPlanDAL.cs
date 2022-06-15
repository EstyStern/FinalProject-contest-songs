using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL
{
    public interface IPlanDAL
    {
        //פונקציה שמחזירה את כל התכניות 
        List<PlanTbl> GetAllPlans();

        //הוספת תוכנית 
        List<PlanTbl> AddPlan(PlanTbl t);

        //עדכון תוכנית ברשימה
        public List<PlanTbl> UpdatePlan(PlanTbl p);

        
    }
}
