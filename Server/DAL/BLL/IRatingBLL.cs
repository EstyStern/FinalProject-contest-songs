using System;
using System.Collections.Generic;
using System.Text;
using DTO;

namespace BLL
{
    public interface IRatingBLL
    {
        //GetAllRatings
        //פונקציה שמחזירה את כל הדרוגים 
        List<RatingDTO> GetAllRatings();
        //פונקציה שמוסיפה דרוג ומחזירה את כל הדרוגים 
        List<RatingDTO> AddRating(RatingDTO r);
        //פונקציה שמביאה את כל הדרוגים של שיר מסוים
        List<RatingDTO> GetAllRatingsByIdSong(int id);
        //פונקצייה שבודקת האם המשתמש דירג כבר את השיר הנוכחי
        bool ReturnIfThisUserRatingThisSong(int song, int user);

        //פונקצייה שבודקת האם המשתמש דירג כבר את  השירים
        List<bool> ReturnIfThisUserRatingSongs(SongDTO[] song, int user);
    }
}
