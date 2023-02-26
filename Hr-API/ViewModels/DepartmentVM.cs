using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    public class DepartmentVM
    {
        public int DepartmentID { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
        public bool DepartmentStatus { get; set; }
    }
}