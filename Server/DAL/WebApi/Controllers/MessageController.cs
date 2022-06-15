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

    public class MessageController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        IMessageBLL _MessageBll;
        public MessageController(IMessageBLL _mBll)
        {
            _MessageBll = _mBll;
        }

        //שליפת רשימת שופטים
        [HttpGet("GetAllMessages")]
        public IActionResult GetAllMessages()
        {
            return Ok(_MessageBll.GetAllMessages());
        }
        //שליפת כל ההודעות לפי לקוח מסוים
        [HttpGet("GetAllMessagesByIdUser/{idUser}")]
        public IActionResult GetAllMessagesByIdUser(int IdUser)
        {
            return Ok(_MessageBll.GetAllMessagesByIdUser(IdUser));
        }
    }
}
