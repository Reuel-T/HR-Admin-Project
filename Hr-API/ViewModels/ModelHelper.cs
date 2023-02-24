using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Hr_API.Models;

namespace Hr_API.ViewModels
{
    public class ModelHelper
    {
        public UserModel UserDBOtoVM(Employee e, Employee? manager)
        {
            //get info from db object
            UserModel u = new UserModel{
                FirstName = e.EmployeeFirstName,
                LastName = e.EmployeeSurname,
                TelephoneNumber = e.EmployeeTelephoneNumber,
                Email = e.EmployeeEmailAddress,
                Role = e.EmployeeRole,
                Status = e.EmployeeStatus,
                ManagerId = e.EmployeeManagerId
            };

            if (manager != null)
            {
                u.ManagerName = $"{manager.EmployeeFirstName} {manager.EmployeeSurname}";
            }

            return u;
        }
    }
}