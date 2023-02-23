using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hr_API.ViewModels;
using Hr_API.Models;

namespace Hr_API.Controllers
{
    [Route("/[controller]/[action]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly HrAdminContext _context;

        public AuthController(HrAdminContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<UserModel>> login(LoginModel l)
        {
            try
            {
                Employee e = await _context.Employees
                    .Where(x => x.EmployeeEmailAddress.Equals(l.Username) && x.EmployeePassword.Equals(l.Password))
                    .FirstOrDefaultAsync();

                if (e == null)
                {
                    return Unauthorized("Unable to log in");
                }else
                {
                    

                    return Ok(e);
                }
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Broke");
            }
        }
    }
}