using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL
{
    public interface IJudgForPlanDAL
    {
        //פונקציה שמחזירה את כל השופטים של כל התוכנית 
        List<JudgForPlanTbl> GetAllJudgForPlans();

        //הוספת שופט
        List<JudgForPlanTbl> AddJudge(JudgForPlanTbl t);

    }
}
