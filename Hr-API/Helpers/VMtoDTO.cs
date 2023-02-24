using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hr_API.Models;
using Hr_API.ViewModels;

namespace Hr_API.Helpers
{
    public static class VMtoDTO
    {
        public static Employee EmployeeEdit(EditEmployeeVM vm, Employee e)
        {
            if (vm.FirstName != null)
            {
                e.EmployeeFirstName = vm.FirstName;
            }

            if(vm.LastName != null)
            {
                e.EmployeeSurname = vm.LastName;
            }

            if(vm.TelephoneNumber != null)
            {
                e.EmployeeTelephoneNumber = vm.TelephoneNumber;
            }

            if(vm.EmailAddress != null)
            {
                e.EmployeeEmailAddress = vm.EmailAddress;
            }

            if (vm.Role.HasValue)
            {
                e.EmployeeRole = vm.Role.Value;
            }

            if (vm.Status != null) 
            {
                e.EmployeeStatus = vm.Status.Value;
            }

            if(vm.Password != null)
            {
                e.EmployeePassword = vm.Password;
            }

            if (vm.ManagerID != null)
            {
                if (int.TryParse(vm.ManagerID, out int newManagerID))
                {
                    e.EmployeeManagerId = newManagerID;
                }
            }

            return e;
        }
    }
}