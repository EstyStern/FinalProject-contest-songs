using System;
using System.Collections.Generic;
using System.Text;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;

namespace BLL
{
    public class TypePlanBLL:ITypePlanBLL
    {
        //DALמופע מסוג ה
        ITypePlanDAL _TypePlanDAL;
        //IMapper מסוג ה
        IMapper _imapper;
        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה 
        public TypePlanBLL(ITypePlanDAL TypePlanDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _TypePlanDAL = TypePlanDAL;
        }
        //GetAllTypePlans
        //פונקציה שמחזירה את כל סוגי התוכניות 
        List<TypePlanDTO> ITypePlanBLL.GetAllTypePlans()
        {
            List<TypePlanTbl> listTypePlans = _TypePlanDAL.GetAllTypePlans();
            try
            {

                return _imapper.Map<List<TypePlanTbl>, List<TypePlanDTO>>(listTypePlans);
            }
            catch
            {
                throw new Exception("not succeed GetAllTypePlans!!");
            }
        }

        ////הוספת סוג תוכנית חדש
        public List<TypePlanDTO> AddTypePlan(TypePlanDTO t)
        {
            TypePlanTbl TypePlanMap = _imapper.Map<TypePlanDTO, TypePlanTbl>(t);

            List<TypePlanTbl> list = _TypePlanDAL.AddTypePlan(TypePlanMap);

            try
            {
                return _imapper.Map<List<TypePlanTbl>, List<TypePlanDTO>>(list);
            }
            catch
            {
                throw new Exception("faild!-add type plan");
            }
        }
    }
}
