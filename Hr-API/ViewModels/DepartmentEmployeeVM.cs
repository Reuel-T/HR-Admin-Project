using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    public class DepartmentEmployeeVM
    {
        public int DepartmentId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int EmployeeId { get; set; }
        public bool IsEmployeeActive { get; set; }
        public bool IsEmployeeManager { get; set; }
    }
}