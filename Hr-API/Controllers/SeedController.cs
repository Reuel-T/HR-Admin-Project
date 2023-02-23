using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Hr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : Controller
    {
        [HttpGet]
        public string Index()
        {
            return "Seed";
        }
    }
}