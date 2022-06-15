using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface ISongBLL
    {
        //GetAllSongs
        //פונקציה שמחזירה את כל השירים 
        List<SongDTO> GetAllSongs();

        //הוספת שיר חדש
        public List<SongDTO> AddSong(SongDTO s);

        //חישוב נקודות
        List<WinsDTO> GetWinsInPlan(List<SongDTO> listSong);
    }
}
