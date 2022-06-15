using System;
using System.Collections.Generic;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;

namespace BLL
{
    public class StepInPlanBLL : IStepInPlanBLL
    {
        //DALמופע מסוג ה
        IStepInPlanDAL _StepInPlanDAL;
        //IMapper מסוג ה
        IMapper _imapper;
        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה 
        public StepInPlanBLL(IStepInPlanDAL StepInPlanDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _StepInPlanDAL = StepInPlanDAL;
        }
        //GetAllStepInPlans
        //פונקציה שמחזירה את כל השלבים של התוכניות 
        public List<StepInPlanDTO> GetAllStepInPlans()
        {
            List<StepInPlanTbl> listTypePlan = _StepInPlanDAL.GetAllStepInPlans();
            try
            {

                return _imapper.Map<List<StepInPlanTbl>, List<StepInPlanDTO>>(listTypePlan);
            }
            catch
            {
                throw new Exception("not succeed GetAllStepInPlans!!");
            }
        }


        ////הוספת  שלב 
        public List<StepInPlanDTO> AddSteps(StepInPlanDTO s)
        {
            StepInPlanTbl stepMap = _imapper.Map<StepInPlanDTO, StepInPlanTbl>(s);

            List<StepInPlanTbl> list = _StepInPlanDAL.AddSteps(stepMap);
            List<StepInPlanDTO> listDto = GetAllStepInPlans();
            try
            {
                return listDto;
                //return _imapper.Map<List<StepInPlanTbl>, List<StepInPlanDTO>>(list);
            }
            catch
            {
                throw new Exception("faild!-add step");
            }
        }

        //עדכון שלב 
        public List<StepInPlanDTO> UpdateSteps(StepInPlanDTO s)
        {
            StepInPlanTbl stepMap = _imapper.Map<StepInPlanDTO, StepInPlanTbl>(s);
            List<StepInPlanTbl> s2 = _StepInPlanDAL.UpdateSteps(stepMap);
            List<StepInPlanDTO> listDto = GetAllStepInPlans();
            return listDto;
            //return _imapper.Map<List<StepInPlanTbl>, List<StepInPlanDTO>>(s2);
        }
    }
}
