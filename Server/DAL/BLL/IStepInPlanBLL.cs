using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface IStepInPlanBLL
    {
        //GetAllStepInPlans
        //פונקציה שמחזירה את כל השלבים של התוכניות 
        List<StepInPlanDTO> GetAllStepInPlans();

        //הוספת  שלב 
        List<StepInPlanDTO> AddSteps(StepInPlanDTO s);

        //עדכון שלב
        public List<StepInPlanDTO> UpdateSteps(StepInPlanDTO s);
    }
}
