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

    public class PlanController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        IPlanBLL _PlanBll;
        public PlanController(IPlanBLL _pBll)
        {
            _PlanBll = _pBll;
        }

        //שליפת רשימת תוכניות
        [HttpGet("GetAllPlans")]
        public IActionResult GetAllPlans()
        {
            return Ok(_PlanBll.GetAllPlans());
        }

        //הוספת תוכנית 
        [HttpPost("AddPlan")]
        public IActionResult AddPlan([FromBody] PlanDTO t)
        {
            return Ok(_PlanBll.AddPlan(t));
        }

        //עדכון תוכנית 
        [HttpPut("UpdatePlan")]
        public IActionResult UpdatePlan([FromBody] PlanDTO p)
        {
            return Ok(_PlanBll.UpdatePlan(p));
        }
    }
}
