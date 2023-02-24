using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hr_API.Models;
using Hr_API.ViewModels;
using Hr_API.Helpers;

namespace Hr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly HrAdminContext _context;

        public EmployeeController(HrAdminContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeVM>>> GetEmployees()
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            List<EmployeeVM> result = new List<EmployeeVM>();

            var employees = await _context.Employees
                .Include(x => x.EmployeeManager)
                .ToListAsync();

            employees.ForEach(employee =>
            {
                result.Add(DTOtoVM.EmployeeVM(employee));
            });

            return Ok(result);
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeVM>> GetEmployee(int id)
        {
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
                EmployeeVM result = DTOtoVM.EmployeeVM(employee);

                return Ok(result);
            }
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, EditEmployeeVM employee)
        {
            if (id != employee.ID)
            {
                return BadRequest();
            }

            var e = await _context.Employees.FindAsync(id);

            //there is an employee to edit
            if(e != null)
            {
                e = VMtoDTO.EmployeeEdit(employee, e);
                _context.Entry(e).State = EntityState.Modified;
            }else 
            {
                return BadRequest("id not found");
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(e);
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
                return Unauthorized("Unable to Create Employee");
            }
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
