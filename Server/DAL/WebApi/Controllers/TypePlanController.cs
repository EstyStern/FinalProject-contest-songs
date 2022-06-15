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

    public class TypePlanController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        ITypePlanBLL _TypePlanBLL;
        public TypePlanController(ITypePlanBLL TypePlanBLL)
        {
            _TypePlanBLL = TypePlanBLL;
        }

        //שליפת רשימת קטגוריות
        [HttpGet("GetAllTypePlans")]
        public IActionResult GetAllTypePlans()
        {
            return Ok(_TypePlanBLL.GetAllTypePlans());
        }

        //הוספת סוג תוכנית 
        [HttpPost("AddTypePlan")]
        public IActionResult AddTypePlan([FromBody] TypePlanDTO t)
        {
            return Ok(_TypePlanBLL.AddTypePlan(t));
        }

    }
}
