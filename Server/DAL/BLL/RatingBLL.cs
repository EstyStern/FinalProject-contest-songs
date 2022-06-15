using System;
using System.Collections.Generic;
using DTO;
using AutoMapper;
using DAL;
using DAL.Models;

namespace BLL
{
    public class RatingBLL : IRatingBLL
    {
        //DALמופע מסוג ה
        IRatingDAL _RatingDAL;
        //IMapper מסוג ה
        IMapper _imapper;

        //ctor 
        //DALמקבל משתנה מסוג 
        //אתחול המשתנים שהגדרנו למעלה 
        public RatingBLL(IRatingDAL RatingDAL)
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<Auto>();

            });
            _imapper = config.CreateMapper();
            _RatingDAL = RatingDAL;
        }
        //GetAllRatings
        //פונקציה שמחזירה את כל הדרוגים 
        public List<RatingDTO> GetAllRatings()
        {
            List<RatingTbl> listRatings = _RatingDAL.GetAllRatings();
            try
            {

                return _imapper.Map<List<RatingTbl>, List<RatingDTO>>(listRatings);
            }
            catch
            {
                throw new Exception("not succeed GetAllRatings!!");
            }
        }

        //פונקציה שמוסיפה דרוג ומחזירה את כל הדרוגים 
        public List<RatingDTO> AddRating(RatingDTO r)
        {
            RatingTbl rating = _imapper.Map<RatingDTO, RatingTbl>(r);
            List<RatingTbl> listRating = _RatingDAL.AddRating(rating);
            try
            {

                return _imapper.Map<List<RatingTbl>, List<RatingDTO>>(listRating);
            }
            catch
            {
                throw new Exception("not succeed AddRating!!");
            }
        }
        //פונקציה שמביאה את כל הדרוגים של שיר מסוים
        public List<RatingDTO> GetAllRatingsByIdSong(int id)
        {
            List < RatingTbl > list= _RatingDAL.GetAllRatingsByIdSong(id);
            try
            {
                return _imapper.Map<List<RatingTbl>, List<RatingDTO>>(list);
            }
            catch
            {
                throw new Exception("not succeed GetAllRatingsByIdSong!!");
            }
        }
        //פונקצייה שבודקת האם המשתמש דירג כבר את השיר הנוכחי

        public bool ReturnIfThisUserRatingThisSong(int song, int user)
        {
            return _RatingDAL.ReturnIfThisUserRatingThisSong(song, user);
        }
        //פונקצייה שבודקת האם המשתמש דירג כבר את  השירים
        public List<bool> ReturnIfThisUserRatingSongs(SongDTO[] song, int user)
        {
            List<bool> list = new List<bool>();
            foreach (var item in song)
            {
                list.Add(_RatingDAL.ReturnIfThisUserRatingThisSong(item.SongId, user));
            }
            return list;
        }
    }
}
