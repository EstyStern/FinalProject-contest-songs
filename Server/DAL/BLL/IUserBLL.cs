using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface IUserBLL
    {
        //GetAllUsers
        //פונקציה שמחזירה את כל המשתמשים 
        List<UserDTO> GetAllUsers();

        //פונקציה שמחזירה האם המשתמש קיים מי הוא ואיזה סוג משתמש הוא עפ"י שם וסיסמה
        UserDTO GetCurrentUserByNameAndPass(string Lname,string Fname,string pass);

        //פונקציה שמחזירה משתמש על ידי קוד משתמש 
        UserDTO GetUserById(int idUser);
        //הוספת לקוח חדש
        List<UserDTO> AddUser(UserDTO u);
    }
}
