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

    public class UserController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        IUserBLL _UserBll;
        public UserController(IUserBLL _uBll)
        {
            _UserBll = _uBll;
        }

        //שליפת רשימת קטגוריות
        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            return Ok(_UserBll.GetAllUsers());
        }

        //שליפת משתמש עפ''י שם וסיסמה
        [HttpGet("GetCurrentUserByNameAndPass/{Lname}/{Fname}/{pass}")]
        public IActionResult GetCurrentUserByNameAndPass(string Lname, string Fname, string pass)
        {
            return Ok(_UserBll.GetCurrentUserByNameAndPass(Lname, Fname, pass));
        }
        //הוספת לקוח חדש
        [HttpPost("AddUser")]
        public IActionResult AddUser([FromBody] UserDTO u)
        {
            return Ok(_UserBll.AddUser(u));
        }
    }
}
