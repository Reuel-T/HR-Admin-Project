using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Hr_API.Models;

namespace Hr_API.ViewModels
{
    public class ModelHelper
    {
        public UserModel UserDBOtoVM(Employee e)
        {
            UserModel u = new UserModel{
                FirstName = e.EmployeeFirstName,
                LastName = e.EmployeeSurname,
                Status = e.EmployeeStatus,
                Role = e.EmployeeRole,
                Email = e.EmployeeEmailAddress,
            };

            return u;
        }
    }
}