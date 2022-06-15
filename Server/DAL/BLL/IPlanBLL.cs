using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface IPlanBLL
    {
        //GetAllPlans
        //פונקציה שמחזירה את כל התכניות 
        List<PlanDTO> GetAllPlans();

        //הוספת  תוכנית 
        List<PlanDTO> AddPlan(PlanDTO t);

        //עדכון תוכנית
        public List<PlanDTO> UpdatePlan(PlanDTO p);

    }
}
