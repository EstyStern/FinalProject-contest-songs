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

    public class JudgForPlanController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        IJudgForPlanBLL _JudgForPlanBll;
        public JudgForPlanController(IJudgForPlanBLL _jpBll)
        {
            _JudgForPlanBll = _jpBll;
        }

        //  שליפת רשימת שופטים
        //  לכל התוכניות
        [HttpGet("GetAllJudgForPlans")]
        public IActionResult GetAllJudgForPlans()
        {
            return Ok(_JudgForPlanBll.GetAllJudgForPlans());
        }

        //הוספת שופט 
        [HttpPost("AddJudge")]
        public IActionResult AddJudge([FromBody] JudgForPlanDTO t)
        {
            return Ok(_JudgForPlanBll.AddJudge(t));
        }
    }
}
