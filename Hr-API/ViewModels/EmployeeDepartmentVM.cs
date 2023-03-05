using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    public class EmployeeDepartmentVM
    {
        public int id { get; set; }
        public string DepartmentName { get; set; }
        public bool IsManager { get; set; }
        public bool Status { get; set; }
    }
}