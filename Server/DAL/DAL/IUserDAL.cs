using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL
{
    public interface IUserDAL
    {
        //פונקציה שמחזירה את כל המשתמשים 
        List<UserTbl> GetAllUsers();
        //פונקציה שמחזירה האם המשתמש קיים מי הוא ואיזה סוג משתמש הוא עפ"י שם וסיסמה
        UserTbl GetCurrentUserByNameAndPass(string Lname, string Fname, string pass);

        //פונקציה שמחזירה משתמש על ידי קוד משתמש 
        UserTbl GetUserById(int idUser);

        //פונקציה שמעדכנת את המשתמש
        List<UserTbl> UpdateUser(UserTbl u);
        //הוספת לקוח חדש
        List<UserTbl> AddUser(UserTbl u);

    }
}
