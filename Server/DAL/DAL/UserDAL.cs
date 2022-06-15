using System;
using DAL.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class UserDAL : IUserDAL
    {
        //יצירת משתנה מסוג הDB
        DB_projectContext _DB;

        //מאתחלת ב-CTOR
        public UserDAL(DB_projectContext DB)
        {
            _DB = DB;
        }
        //פונקציה שמחזירה את כל המשתמשים 
        public List<UserTbl> GetAllUsers()
        {
            return _DB.UserTbls.Include(a=>a.MessageTbls).ToList();
        }
        //פונקציה שמחזירה האם המשתמש קיים מי הוא ואיזה סוג משתמש הוא עפ"י שם וסיסמה
        public UserTbl GetCurrentUserByNameAndPass(string Lname, string Fname, string pass)
        {
            var CurrentUser = _DB.UserTbls.FirstOrDefault(c => c.UserPass == pass && c.UserLastName == Lname && c.UserFirstName == Fname);
                if (CurrentUser != null)
                    return CurrentUser;
            return null;
        }
        //פונקציה שמחזירה משתמש על ידי קוד משתמש 
        public UserTbl GetUserById(int idUser)
        {
            var U = _DB.UserTbls.FirstOrDefault(s => s.UserId == idUser);
            if (U != null)
                return U;
            else
                return null;
        }

        public List<UserTbl> UpdateUser(UserTbl u)
        {
            var userToEdit = _DB.UserTbls.FirstOrDefault(p => p.UserId == u.UserId);
            if (userToEdit != null)
            {
                userToEdit.UserId = u.UserId;
                userToEdit.UserGenre = u.UserGenre;
                userToEdit.UserGender = u.UserGender;
                userToEdit.UserBirthDate = u.UserBirthDate;
                userToEdit.UserCity = u.UserCity;
                userToEdit.UserEmail = u.UserEmail;
                userToEdit.UserPass = u.UserPass;
                userToEdit.UserLastName = u.UserLastName;
                userToEdit.UserFirstName = u.UserFirstName;
                _DB.SaveChanges();
            }
            return _DB.UserTbls.ToList();
        }
        //הוספת לקוח חדש
        public List<UserTbl> AddUser(UserTbl u)
        {
            try
            {
                _DB.UserTbls.Add(u);
                _DB.SaveChanges();
                return _DB.UserTbls.ToList();
            }
            catch
            {
                throw new Exception("faild!-add user");
            }

        }
    }
}
