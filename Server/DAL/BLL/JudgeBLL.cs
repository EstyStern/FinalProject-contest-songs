using System;
using System.Collections.Generic;
using System.Text;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;

namespace BLL
{
    public class JudgeBLL : IJudgeBLL
    {
        //DALמופע מסוג ה
        IJudgeDAL _JudgeDAL;
        IUserDAL _UserDAL;
        //IMapper מסוג ה
        IMapper _imapper;

        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה
        public JudgeBLL(IJudgeDAL JudgeDAL, IUserDAL UserDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _JudgeDAL = JudgeDAL;
            _UserDAL = UserDAL;
        }

        //פונקצייה שמחזירה רשימה של שופטים
        public List<JudgeDTO> GetAllJudges()
        {
            //קבלת כל המשתמשים וכל השופטים
            List<JudgeTbl> listJudges = _JudgeDAL.GetAllJudges();
            //JudgeDTO-יצירת רשימה חדשה מסוג 
            List<JudgeDTO> listreturn=new List<JudgeDTO>();
            //ונכניס אליו את הפרטים JudgeDTOעוברת על שני הרשימות וכל משתמש שהוא גם שופט יצור משתנה מסוג  
            try
            {
                    return _imapper.Map<List<JudgeTbl>, List<JudgeDTO>>(listJudges);
            }
            catch
            {
                throw new Exception("not succeed GetAllJudges!!");
            }
        }
    }
}
