using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    public class EditDepartmentVM
    {
        public int ID { get; set; }
        public string? DepartmentName { get; set; }
        public bool? Status { get; set; }
    }
}