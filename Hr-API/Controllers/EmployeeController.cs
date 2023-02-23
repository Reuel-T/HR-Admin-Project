using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hr_API.Models;
using Hr_API.ViewModels;

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
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
          if (_context.Employees == null)
          {
              return NotFound();
          }

          var ctx = await _context.Employees.Include(x => x.DepartmentEmployees).ThenInclude(x => x.Department).ToListAsync();
            //include department info
            return ctx;
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
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

            return employee;
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
            Employee e = await _context.Employees.Where(x => x.EmployeeEmailAddress.Trim().Equals(employeeIn.EmailAddress)).FirstOrDefaultAsync();

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
                    newEmp.ManagerId = employeeIn.ManagerID.Value;
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
