using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? TelephoneNumber { get; set; } = string.Empty;
        public int Role { get; set; } = 2;
        public int? ManagerId { get; set; }
        public string? ManagerName { get; set; }
        public bool Status { get; set; }
        public List<DepartmentVM> Departments { get; set; } = new List<DepartmentVM>();
    }
}