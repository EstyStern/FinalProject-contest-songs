using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL
{
    public interface IStepInPlanDAL
    {
        //פונקציה שמחזירה את כל השלבים של התוכניות 
        List<StepInPlanTbl> GetAllStepInPlans();

        //הוספת שלב 
        List<StepInPlanTbl> AddSteps(StepInPlanTbl s);

        //עדכון שלב 
        public List<StepInPlanTbl> UpdateSteps(StepInPlanTbl s);
    }
}
