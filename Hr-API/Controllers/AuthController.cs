using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hr_API.ViewModels;
using Hr_API.Models;
using Hr_API.Helpers;

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
        //basic login method
        public async Task<ActionResult<EmployeeVM>> login(LoginModel l)
        {
            try
            {
                //I WOULD 100% hash the password using something like bcrypt.net, but it makes testing a pain, since I can't check plaintext passwords
                var e = await _context.Employees
                    .Where(x => x.EmployeeEmailAddress.Equals(l.Username) && x.EmployeePassword.Equals(l.Password))
                    .Include(x => x.EmployeeManager)
                    .Include(x => x.DepartmentEmployees)
                    .ThenInclude(x => x.Department)
                    .FirstOrDefaultAsync();

                if (e == null)
                {
                    return Unauthorized("Unable to log in");
                }else
                {
                    return Ok(DTOtoVM.EmployeeVM(e));
                }
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Broke");
            }
        }
    }
}