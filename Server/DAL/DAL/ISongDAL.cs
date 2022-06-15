using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;


namespace DAL
{
    public interface ISongDAL
    {
        //פונקציה שמחזירה את כל השירים 
        List<SongTbl> GetAllSongs();
        //הוספת שיר חדש
        List<SongTbl> AddSong(SongTbl s);
    }
}
