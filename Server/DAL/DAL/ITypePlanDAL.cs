using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;


namespace DAL
{
    public interface ITypePlanDAL
    {
        //פונקציה שמחזירה את כל סוגי התוכניות 
        List<TypePlanTbl> GetAllTypePlans();
        //הוספת סוג תוכנית 
        List<TypePlanTbl> AddTypePlan(TypePlanTbl t);
    }

}
