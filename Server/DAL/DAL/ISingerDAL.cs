using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL
{
    public interface ISingerDAL
    {
        //פונקציה שמחזירה את כל הזמרים-מתמודדים 
        List<SingerTbl> GetAllSingers();
        //פונקציה שמחזירה זמר על ידי קוד משתמש 
        SingerTbl GetSingerById(int idUser);

        //פונקציה שמעדכנת את הזמר
        List<SingerTbl> UpdateSinger(SingerTbl s);

        //פונקציה שמוסיפה את הזמר
        List<SingerTbl> AddSinger(SingerTbl s);

        //פונקציה שמוחקת את הזמר לפי קוד
        List<SingerTbl> DeleateSinger(int SingerId);
    }
}
