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
    public class DepartmentController : ControllerBase
    {
        private readonly HrAdminContext _context;

        public DepartmentController(HrAdminContext context)
        {
            _context = context;
        }

        // GET: api/Department
        //gets a list of departments, filterable by the status
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentVM>>> GetDepartments(bool? status)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }

            List<DepartmentVM> result = new List<DepartmentVM>();

            if (status.HasValue)
            { 
                var ctx =  await _context.Departments.Where(x => x.DepartmentStatus == status).ToListAsync();

                ctx.ForEach(x =>
                {
                    result.Add(DTOtoVM.DepartmentVM(x));
                });

                return result;

            }else
            {
                var ctx =  await _context.Departments.ToListAsync();

                ctx.ForEach(x =>
                {
                    result.Add(DTOtoVM.DepartmentVM(x));
                });

                return result;
            }
            
        }

        // GET: api/Department/5
        //returns a single department
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentVM>> GetDepartment(int id)
        {
          if (_context.Departments == null)
          {
              return NotFound();
          }
            var department = await _context.Departments.FindAsync(id);

            if (department == null)
            {
                return NotFound();
            }

            var departmentVM = DTOtoVM.DepartmentVM(department);

            return departmentVM;
        }

        // PUT: api/Department/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //updates an existing department
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, EditDepartmentVM department)
        {
            //check if the correct department is being edited
            if (id != department.ID)
            {
                return BadRequest();
            }

            var d = await _context.Departments.FindAsync(id);

            //there is a department to edit
            if(d != null)
            {
                d = VMtoDTO.DepartmentEdit(department, d);
                _context.Entry(d).State = EntityState.Modified;
            }else
            {
                return BadRequest("id not found");
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok("Department Updated");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }

        // POST: api/Department
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //adds a department to the database
        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(CreateDepartmentViewModel department)
        {
          if (_context.Departments == null)
          {
              return Problem("Entity set 'HrAdminContext.Departments'  is null.");
          }
            Department newDep = new Department
            {
                DepartmentName = department.DepartmentName,
                DepartmentStatus = false,
            };

            _context.Departments.Add(newDep);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = newDep.DepartmentId }, newDep);
        }

        // DELETE: api/Department/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepartmentExists(int id)
        {
            return (_context.Departments?.Any(e => e.DepartmentId == id)).GetValueOrDefault();
        }
    }
}
