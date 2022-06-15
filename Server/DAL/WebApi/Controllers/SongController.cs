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

    public class SongController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        ISongBLL _SongBLL;
        public SongController(ISongBLL SongBLL)
        {
            _SongBLL = SongBLL;
        }

        //שליפת רשימת קטגוריות
        [HttpGet("GetAllSongs")]
        public IActionResult GetAllSongs()
        {
            return Ok(_SongBLL.GetAllSongs());
        }
        //הוספת שיר חדש
        [HttpPost("AddSong")]
        public IActionResult AddSong([FromBody] SongDTO s)
        {
            return Ok(_SongBLL.AddSong(s));
        }

        //חישוב נקודות
        [HttpPost("GetWinsInPlan")]
        public IActionResult GetWinsInPlan([FromBody] List<SongDTO> ListSongs)
        {
            return Ok(_SongBLL.GetWinsInPlan(ListSongs));
        }

    }
}
