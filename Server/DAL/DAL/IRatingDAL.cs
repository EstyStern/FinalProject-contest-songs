using System;
using System.Collections.Generic;
using System.Text;
using DAL.Models;

namespace DAL
{
    public interface IRatingDAL
    {
        //פונקציה שמחזירה את כל הדרוגים 
        List<RatingTbl> GetAllRatings();
        //פונקציה שמוסיפה דרוג ומחזירה את כל הדרוגים 
        List<RatingTbl> AddRating(RatingTbl r);
        //פונקציה שמביאה את כל הדרוגים של שיר מסוים
        List<RatingTbl> GetAllRatingsByIdSong(int id);
        //פונקצייה שבודקת האם המשתמש דירג כבר את השיר הנוכחי
        bool ReturnIfThisUserRatingThisSong(int song, int user);
    }
}
