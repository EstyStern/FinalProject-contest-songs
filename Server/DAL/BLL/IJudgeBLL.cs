using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface IJudgeBLL
    {
        //GetAllJudges
        //פונקציה שמחזירה את כל השופטים 
        List<JudgeDTO> GetAllJudges();
    }
}
