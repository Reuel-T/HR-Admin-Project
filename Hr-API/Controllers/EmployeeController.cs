using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Hr_API.Models;
using Hr_API.ViewModels;
using Hr_API.Helpers;

namespace Hr_API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly HrAdminContext _context;

        public EmployeeController(HrAdminContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("/api/me")]
        public async Task<ActionResult<EmployeeVM>> GetSelf(){

            string id = User.FindFirstValue("id");
            if(!string.IsNullOrEmpty(id))
            {
                return RedirectToAction("GetEmployee", new { id = Convert.ToInt32(id) });
            }
            else
            {
                return NotFound();
            }
        }

        // GET: api/Employee
        /// <summary>
        /// Get request that returns a list of employees
        /// </summary>
        /// <returns>A list of employee objects</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeVM>>> GetEmployees()
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            List<EmployeeVM> result = new List<EmployeeVM>();

            //get all the employees and their managers
            var employees = await _context.Employees
                .Include(x => x.EmployeeManager)
                .ToListAsync();

            //convert the database objetcs to a model for clients
            employees.ForEach(employee =>
            {
                result.Add(DTOtoVM.EmployeeVM(employee));
            });

            return Ok(result);
        }

        // GET: api/Employee/5
        /// <summary>
        /// Method to return a single Employee object
        /// </summary>
        /// <param name="id">The ID of an employee to search for</param>
        /// <returns></returns>
        [HttpGet]
        [Route("/api/employees/{id}")]
        public async Task<ActionResult<EmployeeVM>> GetEmployee(int id)
        {
            string roleId = User.FindFirstValue(ClaimTypes.Role);
            string userId = User.FindFirstValue("id");

            //list of departments the user manages
            List<int> managedDepartments = JsonSerializer.Deserialize<List<int>>(User.FindFirstValue("managedDepartments"));

            if (_context.Employees == null)
            {
                return NotFound();
            }

            //include connected tables
            var employee = await _context.Employees
                .Include(x => x.EmployeeManager)
                .Include(x => x.DepartmentEmployees)
                .ThenInclude(x => x.Department)
                .Where(x => x.EmployeeId == id).FirstOrDefaultAsync();

            //if employee exists
            if (employee == null)
            {
                return NotFound();
            }else
            {
                bool manages = employee.EmployeeManagerId.ToString() == userId;
                bool idValid = (!string.IsNullOrEmpty(userId) && userId.Equals(id));
                bool roleValid = (!string.IsNullOrEmpty(roleId) && roleId.Equals("0"));

                List<int> employeeDepartments = new List<int>();

                //list of departments the requested employee is part of
                employee.DepartmentEmployees.ToList().ForEach(x => { employeeDepartments.Add(x.DepartmentId.Value); });

                //check if the users managed departments contains any of the departments that this employee is part of
                manages = managedDepartments.Intersect(employeeDepartments).Any();

                //if the user requests themself or is an admin or manages this employee
                if ( idValid || roleValid || manages)
                {
                    return Ok(DTOtoVM.EmployeeVM(employee));
                }else
                {
                    return Unauthorized();
                }
            }
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Method to Edit an employee
        /// </summary>
        /// <param name="id">Id of the employee to be updated</param>
        /// <param name="employee">Object containing the data of the employee to be changed</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EditEmployeeVM employee)
        {
            if (id != employee.ID)
            {
                return BadRequest();
            }

            var e = await _context.Employees
                .Include(x => x.EmployeeManager)
                .Include(x => x.DepartmentEmployees)
                .ThenInclude(x => x.Department)
                .Where(x => x.EmployeeId == id).FirstOrDefaultAsync();

            //there is an employee to edit
            if(e != null)
            {
                //update using the helper method
                e = VMtoDTO.EmployeeEdit(employee, e);
                _context.Entry(e).State = EntityState.Modified;
            }else 
            {
                return BadRequest("id not found");
            }

            try
            {
                await _context.SaveChangesAsync();
                
                return Ok(DTOtoVM.EmployeeVM(e));
            }
            catch (DbUpdateConcurrencyException err)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest($"Server Broke {err.Message}");
                }
            }
        }

        // POST: api/Employee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /// <summary>
        /// Method to add an employee to the database
        /// </summary>
        /// <param name="employeeIn">The data of the employee to be created</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(CreateEmployeeModel employeeIn)
        {
            //generated code, I don't see a reason to change this
            if (_context.Employees == null)
            {
                return Problem("Entity set 'HrAdminContext.Employees'  is null.");
            }

            //check to see if there is an existing employee with this email address
            var e = await _context.Employees
                .Where(x => x.EmployeeEmailAddress.Trim().Equals(employeeIn.EmailAddress))
                .FirstOrDefaultAsync();

            //if the email is available, go on and create
            if (e == null)
            {
                Employee newEmp = new Employee
                {
                    EmployeeFirstName = employeeIn.FirstName.Trim(),
                    EmployeeSurname = employeeIn.LastName.Trim(),
                    EmployeeEmailAddress = employeeIn.EmailAddress.Trim(),
                    EmployeeTelephoneNumber = employeeIn.TelephoneNumber.Trim(),
                    EmployeePassword = "Password123#",
                    EmployeeRole = 2
                };
                //I WOULD 100% hash this using something like bcrypt.net, but it makes testing a pain, since I can't check plaintext passwords

                //if we're assigning a manager to the employee
                if(employeeIn.ManagerID != null)
                {
                    newEmp.EmployeeManagerId = employeeIn.ManagerID.Value;
                }

                //add to the db
                _context.Employees.Add(newEmp);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetEmployee", new { id = newEmp.EmployeeId }, newEmp);
            }else
            {
                return BadRequest("Unable to Create Employee");
            }
        }

        //list all possible manager options for a specific user id
        [HttpGet]
        [Route("/api/employee-managers/{id}")]
        public async Task<ActionResult<IEnumerable<ManagerVM>>> GetManagersForEmployee(int id){
            var managers = await _context.Employees.Where(x => x.EmployeeId != id).ToListAsync();

            List<ManagerVM> result = new List<ManagerVM>();

            result.Add(new ManagerVM
            {
                ID = -1,
                name = "Unmanaged"
            });

            managers.ForEach(x =>
            {
                result.Add(DTOtoVM.ManagerVM(x));
            });

            return Ok(result);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return (_context.Employees?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }
    }
}
