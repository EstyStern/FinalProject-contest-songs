using System;
using System.Collections.Generic;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;

namespace BLL
{
    public class SingerBLL : ISingerBLL
    {
        //DALמופע מסוג ה
        ISingerDAL _SingerDAL;
        IUserDAL _UserDAL;
        //IMapper מסוג ה
        IMapper _imapper;
        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה 
        public SingerBLL(ISingerDAL SingerDAL, IUserDAL UserDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _SingerDAL = SingerDAL;
            _UserDAL = UserDAL;
        }

        


        //GetAllSingers
        //פונקציה שמחזירה את כל הזמרים-מתמודדים 
        public List<SingerDTO> GetAllSingers()
        {
            List<SingerTbl> listSingers = _SingerDAL.GetAllSingers();
            //SingerDTO-יצירת רשימה חדשה מסוג 
            List<SingerDTO> listreturn = new List<SingerDTO>();
            try
            {
                    return _imapper.Map<List<SingerTbl>, List<SingerDTO>>(listSingers);
                
            }
            catch
            {
                throw new Exception("not succeed GetAllSingers!!");
            }
        }

        //UpdateSinger
        //פונקציה שמעדכנת את הזמר

        public List<SingerDTO> UpdateSinger(SingerDTO s)
        {
            SingerTbl singer = _imapper.Map<SingerDTO, SingerTbl>(s);
            //האם יש דרך אחרת לחלק את המשתנה המתקבל לשתי חלקים????????
            UserTbl user = new UserTbl();
            user.UserId = s.UserId;
            user.UserGenre = s.UserGenre;
            user.UserLastName = s.UserLastName;
            user.UserFirstName = s.UserFirstName;
            List<SingerTbl> singerList = _SingerDAL.UpdateSinger(singer);
            List<UserTbl> userList = _UserDAL.UpdateUser(user);
            try
            {
                return GetAllSingers();
            }
            catch
            {
                throw new Exception("not succeed UpdateSinger!!");
            }
        }

        //AddSinger
        //פונקציה שמוסיפה את הזמר
        public List<SingerDTO> AddSinger(SingerDTO s)
        {
            
                SingerTbl singer = _imapper.Map<SingerDTO, SingerTbl>(s);
                List<SingerTbl> listSinger = _SingerDAL.AddSinger(singer);
                try
                {
                    return _imapper.Map<List<SingerTbl>, List<SingerDTO>>(listSinger);
                }
                catch
                {
                    throw new Exception("not succeed AddSinger!!");
                }
            
        }
        //DeleateSinger
        //פונקציה שמוחקת את הזמר לפי קוד
        public List<SingerDTO> DeleateSinger(int SingerId)
        {
                List<SingerTbl> listSinger = _SingerDAL.DeleateSinger(SingerId);
                try
                {

                    return _imapper.Map<List<SingerTbl>, List<SingerDTO>>(listSinger);
                }
                catch
                {
                    throw new Exception("not succeed DeleateSinger!!");
                }
            }
    }
}
