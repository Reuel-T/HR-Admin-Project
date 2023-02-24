using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hr_API.Models;

namespace Hr_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentEmployeeController : ControllerBase
    {
        private readonly HrAdminContext _context;

        public DepartmentEmployeeController(HrAdminContext context)
        {
            _context = context;
        }

        // GET: api/DepartmentEmployee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentEmployee>>> GetDepartmentEmployees()
        {
          if (_context.DepartmentEmployees == null)
          {
              return NotFound();
          }
            return await _context.DepartmentEmployees.ToListAsync();
        }

        /// <summary>
        /// Method adds an employee to a department
        /// </summary>
        /// <param name="empID">The ID of the Employee</param>
        /// <param name="depID">The ID of the Department</param>
        /// <param name="manager">Boolean value representing if the employee should be made a manager</param>
        /// <response code="201">Returns the created object</response>
        /// <response code="400">An error message detailing the incorrect parameter passed in</response>
        /// <returns></returns>
        [HttpPost]
        [Route("api/emp-to-department")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddEmployeeToDepartment(int empID, int depID, bool manager)
        {
            DepartmentEmployee de = await _context.DepartmentEmployees
                .Where(x => empID == x.EmployeeId && depID == x.DepartmentId)
                .FirstOrDefaultAsync();

            //check if the employee exists
            if (await _context.Employees.FindAsync(empID) ==  null)
            {
                return(BadRequest("Employee does not exist"));
            }

            if(await _context.Departments.FindAsync(depID) == null)
            {
                return(BadRequest("Department does not exist"));
            }

            if(de == null)
            {
                DepartmentEmployee newDe = new DepartmentEmployee 
                {
                    EmployeeId = empID,
                    DepartmentId = depID,
                    DepartmentManager = manager
                };

                _context.DepartmentEmployees.Add(newDe);
                await _context.SaveChangesAsync();

                return Ok(newDe);
            }else
            {
                return(BadRequest("Employee is already assigned to this department"));
            }
        }

        // GET: api/DepartmentEmployee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentEmployee>> GetDepartmentEmployee(int id)
        {
          if (_context.DepartmentEmployees == null)
          {
              return NotFound();
          }
            var departmentEmployee = await _context.DepartmentEmployees.FindAsync(id);

            if (departmentEmployee == null)
            {
                return NotFound();
            }

            return departmentEmployee;
        }

        // PUT: api/DepartmentEmployee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartmentEmployee(int id, DepartmentEmployee departmentEmployee)
        {
            if (id != departmentEmployee.DepartmentEmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(departmentEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentEmployeeExists(id))
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

        // POST: api/DepartmentEmployee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DepartmentEmployee>> PostDepartmentEmployee(DepartmentEmployee departmentEmployee)
        {
          if (_context.DepartmentEmployees == null)
          {
              return Problem("Entity set 'HrAdminContext.DepartmentEmployees'  is null.");
          }
            _context.DepartmentEmployees.Add(departmentEmployee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartmentEmployee", new { id = departmentEmployee.DepartmentEmployeeId }, departmentEmployee);
        }

        // DELETE: api/DepartmentEmployee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartmentEmployee(int id)
        {
            if (_context.DepartmentEmployees == null)
            {
                return NotFound();
            }
            var departmentEmployee = await _context.DepartmentEmployees.FindAsync(id);
            if (departmentEmployee == null)
            {
                return NotFound();
            }

            _context.DepartmentEmployees.Remove(departmentEmployee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentEmployeeExists(int id)
        {
            return (_context.DepartmentEmployees?.Any(e => e.DepartmentEmployeeId == id)).GetValueOrDefault();
        }
    }
}
