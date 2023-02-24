using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    public class EmployeeVM
    {
        public int EmployeeID { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? TelephoneNumber { get; set; }
        public string EmailAddress { get; set; } = null!;
        public byte Role { get; set; }
        public bool Status { get; set; }
        
        public int? ManagerID { get; set; }
        public string? ManagerName { get; set; }
        public List<DepartmentModel> Departments { get; set; } = new List<DepartmentModel>();
    }
}