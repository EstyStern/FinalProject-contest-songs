using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class StepInPlanDAL : IStepInPlanDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;
        //מאתחלת ב-CTOR
        public StepInPlanDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל השלבים של התוכניות 

        public List<StepInPlanTbl> GetAllStepInPlans()
        {
            return _DB.StepInPlanTbls.Include(e=>e.Plan).Include(e => e.SongTbls).ToList();
        }


        //הוספת  שלב 
        public List<StepInPlanTbl> AddSteps(StepInPlanTbl s)
        {
            try
            {
                _DB.StepInPlanTbls.Add(s);
                _DB.SaveChanges();
                return _DB.StepInPlanTbls.ToList();
            }
            catch
            {
                throw new Exception("faild!-add step");
            }

        }

        //עדכון שלב
        public List<StepInPlanTbl> UpdateSteps (StepInPlanTbl s)
        {
            var stepToEdit = _DB.StepInPlanTbls.FirstOrDefault(a => a.StepInPlanId == s.StepInPlanId);
            if (stepToEdit != null)
            {
                stepToEdit.StepInPlanId = s.StepInPlanId;
                stepToEdit.PlanId = s.PlanId;
                stepToEdit.StepInPlanStartDate = s.StepInPlanStartDate;
                stepToEdit.StepInPlanEndDateToUploadSong = s.StepInPlanEndDateToUploadSong;
                stepToEdit.StepInPlanEndDateToJudg = s.StepInPlanEndDateToJudg;
                stepToEdit.StepInPlanEndDateToRating = s.StepInPlanEndDateToRating;
                stepToEdit.StepInPlanPart = s.StepInPlanPart;
               
                _DB.SaveChanges();
                return _DB.StepInPlanTbls.ToList();
            }
            return null;
        }
    }
}
