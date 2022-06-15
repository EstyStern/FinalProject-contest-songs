using System;
using System.Collections.Generic;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;

namespace BLL
{
    public class UserBLL : IUserBLL
    {
        //DALמופע מסוג ה
        IUserDAL _UserDAL;
        IJudgeDAL _JudgeDAL;
        ISingerDAL _SingerDAL;
        //IMapper מסוג ה
        IMapper _imapper;

        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה 
        public UserBLL(IUserDAL UserDAL, IJudgeDAL JudgeDAL, ISingerDAL SingerDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _UserDAL = UserDAL;
            _JudgeDAL = JudgeDAL;
            _SingerDAL = SingerDAL;
        }
        //פונקצייה שמחזירה רשימה של משתמשים  
        public List<UserDTO> GetAllUsers()
        {
            List<UserTbl> listUsers = _UserDAL.GetAllUsers();
            try
            {

                return _imapper.Map<List<UserTbl>, List<UserDTO>>(listUsers);
            }
            catch
            {
                throw new Exception("not succeed GetAllUsers!!");
            }
        }
        //פונקציה שמחזירה האם המשתמש קיים מי הוא ואיזה סוג משתמש הוא עפ"י שם וסיסמה
        public UserDTO GetCurrentUserByNameAndPass(string Lname, string Fname, string pass)
        {
            //משתנה שבודק האם המשתמש נמצא בטבלת משתמשים
            UserTbl userToMap= _UserDAL.GetCurrentUserByNameAndPass( Lname,  Fname,  pass);
            //DTOממפה אותו לסוג
            UserDTO currentUser = _imapper.Map<UserTbl,UserDTO > (userToMap);
            //אם שווה למנהל
            if(Lname=="אסתי" && Fname == "יפי" && pass== "ey12") {
                currentUser.TypeOfUser = 4;
            }
            //אם לא קיים-מצב אורח
            else if (currentUser == null)
            {
                return null;
            }
            //אחרת -או זמר או שופט או מדרג
            else 
            {
                //בדיקה האם הוא שופט
                JudgeTbl j = _JudgeDAL.GetJudgeById(currentUser.UserId);
                //אם כן שינוי הסוג לשופט
                if (j != null)
                {
                    currentUser.TypeOfUser = 2;
                }
                else
                {
                    //בדיקה האם הוא זמר
                    SingerTbl s = _SingerDAL.GetSingerById(currentUser.UserId);
                    if (s != null)
                    {
                        //אם כן שינוי הסוג לזמר
                        currentUser.TypeOfUser = 3;
                    }
                    else
                    {
                        //אחרת הוא מדרג
                        currentUser.TypeOfUser = 1;
                    }
                }
            }

            return currentUser;
        }
        //פונקציה שמחזירה משתמש על ידי קוד משתמש 
        public UserDTO GetUserById(int idUser)
        {
            UserTbl User = _UserDAL.GetUserById(idUser);
            try
            {
                return _imapper.Map<UserTbl, UserDTO>(User);
            }
            catch
            {
                throw new Exception("not succeed GetUserById!!");
            }
        }
        ////הוספת לקוח חדש
        public List<UserDTO> AddUser(UserDTO u)
        {
            UserTbl userMap = _imapper.Map<UserDTO, UserTbl>(u);

            List<UserTbl> list = _UserDAL.AddUser(userMap);

            try
            {
                return _imapper.Map<List<UserTbl>, List<UserDTO>>(list);
            }
            catch
            {
                throw new Exception("faild!-add user");
            }
        }
    }
}
