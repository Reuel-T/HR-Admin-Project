using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
        private readonly IConfiguration _configuration;

        public AuthController(HrAdminContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
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
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = _configuration.GetSection("Jwt:Key").Value;
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[]
                        {
                            new Claim("id", e.EmployeeId.ToString()),
                            new Claim("firstName", e.EmployeeFirstName),
                            new Claim("lastName", e.EmployeeSurname),
                            new Claim("TelephoneNumber", e.EmployeeTelephoneNumber),
                            new Claim(ClaimTypes.Email, e.EmployeeEmailAddress),
                            new Claim(ClaimTypes.Role, e.EmployeeRole.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddMinutes(30),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);

                    return Ok(new { Model = DTOtoVM.EmployeeVM(e), token = tokenHandler.WriteToken(token)});
                }
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Broke");
            }
        }
    }
}