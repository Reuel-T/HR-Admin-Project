using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    /// <summary>
    ///     Model to Add an Employee to A Department
    /// </summary>
    public class CreateDepartmentEmployeeVM
    {
        /// <summary>
        ///     The ID of the employee
        /// </summary>
        public int employeeId { get; set; }
        /// <summary>
        ///     The ID of the department
        /// </summary>
        public int departmentId { get; set; }
    }
}