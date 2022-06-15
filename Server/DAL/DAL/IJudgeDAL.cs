using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public interface IJudgeDAL
    {
        //פונקציה שמחזירה את כל השופטים 
        List<JudgeTbl> GetAllJudges();
        //פונקציה שמחזירה שופט על ידי קוד משתמש 
        JudgeTbl GetJudgeById(int idUser);
    }
}
