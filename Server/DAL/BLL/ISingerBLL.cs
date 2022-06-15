using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface ISingerBLL
    {
        //GetAllSingers
        //פונקציה שמחזירה את כל הזמרים-מתמודדים 
        List<SingerDTO> GetAllSingers();

        //UpdateSinger
        //פונקציה שמעדכנת את הזמר
        List<SingerDTO> UpdateSinger(SingerDTO s);

        //AddSinger
        //פונקציה שמוסיפה את הזמר
        List<SingerDTO> AddSinger(SingerDTO s);

        //DeleateSinger
        //פונקציה שמוחקת את הזמר לפי קוד
        List<SingerDTO> DeleateSinger(int SingerId);
    }
}
