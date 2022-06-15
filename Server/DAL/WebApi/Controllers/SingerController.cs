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

    public class SingerController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        ISingerBLL _SingerBLL;
        public SingerController(ISingerBLL SingerBLL)
        {
            _SingerBLL = SingerBLL;
        }

        //שליפת רשימת קטגוריות
        [HttpGet("GetAllSingers")]
        public IActionResult GetAllSingers()
        {
            return Ok(_SingerBLL.GetAllSingers());
        }
        //עדכון של זמר
        [HttpPut("UpdateSinger")]
        public IActionResult UpdateSinger([FromBody] SingerDTO s)
        {
            return Ok(_SingerBLL.UpdateSinger(s));
        }

    }
}
