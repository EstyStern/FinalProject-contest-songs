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
    public class PlanBLL : IPlanBLL
    {
        //DALמופע מסוג ה
        IPlanDAL _PlanDAL;
        ITypePlanDAL _TypePlanDAL;
        IStepInPlanDAL _StepInPlanDAL;

        //IMapper מסוג ה
        IMapper _imapper;

        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלהלמעלה
        public PlanBLL(IPlanDAL PlanDAL, ITypePlanDAL TypePlan, IStepInPlanDAL StepInPlan)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _PlanDAL = PlanDAL;
            _TypePlanDAL = TypePlan;
            _StepInPlanDAL = StepInPlan;
        }
        //פונקצייה שמחזירה רשימה של תוכניות
        public List<PlanDTO> GetAllPlans()
        {
            List<PlanTbl> listPlans = _PlanDAL.GetAllPlans();

            //PlanDTO-יצירת רשימה חדשה מסוג 
            List<PlanDTO> listReturn = new List<PlanDTO>();
            //הוספת השדות של סוג תוכנית
            try
            {
                foreach (var item in listPlans)
                {
                    if (item.StepInPlanTbls == null || item.StepInPlanTbls.Count()==0)
                    {
                        PlanDTO PlanMap = _imapper.Map<PlanTbl,PlanDTO>(item);
                        listReturn.Add(PlanMap);
                    }

                    int count = 0;
                    foreach (var element in item.StepInPlanTbls)
                    {
                        count = count + 1;
                        if (element.StepInPlanStartDate <= DateTime.Now && element.StepInPlanEndDateToJudg >= DateTime.Now)
                        {
                            PlanDTO plan = _imapper.Map<PlanTbl, PlanDTO>(item);
                            plan.CurentStepInPlanId = element.StepInPlanId;
                            listReturn.Add(plan);
                            count = 0;
                        }
                        else {
                            if (count == 3 )
                        {
                            PlanDTO plan = _imapper.Map<PlanTbl, PlanDTO>(item);
                            plan.CurentStepInPlanId = null;
                            listReturn.Add(plan);
                        }
                        }
                    }
                    
                }
                
                return listReturn;

            }

            catch
            {
                throw new Exception("not succeed GetAllPlans!!");
            }


        }


        ////הוספת  תוכנית חדשה
        public List<PlanDTO> AddPlan(PlanDTO t)
        {
            PlanTbl PlanMap = _imapper.Map<PlanDTO, PlanTbl>(t);

            List<PlanTbl> list = _PlanDAL.AddPlan(PlanMap);
            List<PlanDTO> listDto = GetAllPlans();

            try
            {
                //return _imapper.Map<List<PlanTbl>, List<PlanDTO>>(list);
                return listDto;
            }
            catch
            {
                throw new Exception("faild!-add plan");
            }
        }

        //עדכון תוכנית ברשימה
        public List<PlanDTO> UpdatePlan(PlanDTO p)
        {
            PlanTbl PlanMap = _imapper.Map<PlanDTO, PlanTbl>(p);
            List<PlanTbl> p2 = _PlanDAL.UpdatePlan(PlanMap);
            List<PlanDTO> listDto = GetAllPlans();
            return listDto;
            //return _imapper.Map<List<PlanTbl>, List<PlanDTO>>(p2);
        }

        

    }
}


