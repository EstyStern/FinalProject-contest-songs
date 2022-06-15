using System;
using System.Collections.Generic;
using System.Text;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;
using System.Linq;

namespace BLL
{
    public class JudgForPlanBLL:IJudgForPlanBLL
    {
        //DALמופע מסוג ה
        IJudgForPlanDAL _JudgForPlanDAL;
        //IMapper מסוג ה
        IMapper _imapper;

        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה
        public JudgForPlanBLL(IJudgForPlanDAL JudgForPlanDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _JudgForPlanDAL = JudgForPlanDAL;
        }

        //פונקצייה שמחזירה רשימה של שופטים לכל התוכניות
        public List<JudgForPlanDTO> GetAllJudgForPlans()
        {
            List<JudgForPlanTbl> listJudgForPlan = _JudgForPlanDAL.GetAllJudgForPlans();
            List<JudgForPlanDTO> listReturn=new List<JudgForPlanDTO>();

            try
            {
                foreach (var item in listJudgForPlan)
                {
                    JudgForPlanDTO j = _imapper.Map<JudgForPlanTbl, JudgForPlanDTO>(item);
                    j.JudgePic = item.User.JudgeTbls.ToArray()[0].JudgePic;
                    listReturn.Add(j);

                }
                return listReturn;
            }
            catch
            {
                throw new Exception("not succeed GetAllJudgForPlans!!");
            }
        }

        ////הוספת  שופט 
        public List<JudgForPlanDTO> AddJudge(JudgForPlanDTO t)
        {
            JudgForPlanTbl JudgeMap = _imapper.Map<JudgForPlanDTO, JudgForPlanTbl>(t);

            List<JudgForPlanTbl> list = _JudgForPlanDAL.AddJudge(JudgeMap);
            //List<JudgForPlanDTO> listDto = GetAllJudgForPlans();

            try
            {
                return _imapper.Map<List<JudgForPlanTbl>, List<JudgForPlanDTO>>(list);
                //return listDto;
            }
            catch
            {
                throw new Exception("faild!-add judge");
            }
        }
    }
}
