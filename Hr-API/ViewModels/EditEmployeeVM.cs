using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    public class EditEmployeeVM
    {
        public int ID { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? TelephoneNumber { get; set; }
        public string? EmailAddress { get; set; }
        public byte? Role { get; set; }
        public bool? Status { get; set; }
        public string? Password { get; set; }
        //string used here, due to 3 options, remain the same, id of manager, no manager
        public string? ManagerID { get; set; }
    }
}