using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface ITypePlanBLL
    {
        //GetAllTypePlans
        //פונקציה שמחזירה את כל סוגי התוכניות 
        List<TypePlanDTO> GetAllTypePlans();

        //הוספת סוג תוכנית 
        List<TypePlanDTO> AddTypePlan(TypePlanDTO t);
    }
}
