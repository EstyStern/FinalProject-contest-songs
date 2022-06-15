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

    public class StepInPlanController : ControllerBase
    {
        //BLL משתנה פרטי מסוג שכבת
        IStepInPlanBLL _StepInPlanBLL;
        public StepInPlanController(IStepInPlanBLL StepInPlanBLL)
        {
            _StepInPlanBLL = StepInPlanBLL;
        }

        //שליפת רשימת קטגוריות
        [HttpGet("GetAllStepInPlans")]
        public IActionResult GetAllStepInPlans()
        {
            return Ok(_StepInPlanBLL.GetAllStepInPlans());
        }

        //  הוספת שלבים 
        [HttpPost("AddSteps")]
        public IActionResult AddSteps([FromBody] StepInPlanDTO s)
        {
            return Ok(_StepInPlanBLL.AddSteps(s));
        }

        //עדכון שלבים 
        [HttpPut("UpdateSteps")]
        public IActionResult UpdateSteps([FromBody] StepInPlanDTO s)
        {
            return Ok(_StepInPlanBLL.UpdateSteps(s));
        }

    }
}
