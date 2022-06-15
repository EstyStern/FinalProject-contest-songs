using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DTO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class RatingController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        IRatingBLL _RatingBLL;
        public RatingController(IRatingBLL RatingBLL)
        {
            _RatingBLL = RatingBLL;
        }

        //שליפת רשימת קטגוריות
        [HttpGet("GetAllRatings")]
        public IActionResult GetAllRatings()
        {
            return Ok(_RatingBLL.GetAllRatings());
        }
        //הוספת דרוג
        [HttpPost("AddRating")]
        public IActionResult AddRating([FromBody]RatingDTO r)
        {
            return Ok(_RatingBLL.AddRating(r));
        }
        //פונקציה שמביאה את כל הדרוגים של שיר מסוים
        [HttpGet("GetAllRatingsByIdSong/{id}")]
        public IActionResult GetAllRatingsByIdSong(int id)
        {
            return Ok(_RatingBLL.GetAllRatingsByIdSong(id));
        }
        //פונקצייה שבודקת האם המשתמש דירג כבר את השיר הנוכחי
        [HttpGet("ReturnIfThisUserRatingThisSong/{song}/{user}")]
        public IActionResult ReturnIfThisUserRatingThisSong(int song,int user)
        {
            return Ok(_RatingBLL.ReturnIfThisUserRatingThisSong(song,user));
        }

        //פונקצייה שבודקת האם המשתמש דירג כבר את השיר הנוכחי
        [HttpPost("ReturnIfThisUserRatingSongs/{user}")]
        public IActionResult ReturnIfThisUserRatingSongs(int user, [FromBody] SongDTO[] song)
        {
            return Ok(_RatingBLL.ReturnIfThisUserRatingSongs(song, user));
        }
    }
}
