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
            if (vm.FirstName != null || !vm.FirstName.Equals(string.Empty))
            {
                e.EmployeeFirstName = vm.FirstName;
            }

            if(vm.LastName != null || vm.LastName.Equals(string.Empty))
            {
                e.EmployeeSurname = vm.LastName;
            }

            if(vm.TelephoneNumber != null || vm.TelephoneNumber.Equals(string.Empty))
            {
                e.EmployeeTelephoneNumber = vm.TelephoneNumber;
            }

            if(vm.EmailAddress != null || vm.EmailAddress.Equals(string.Empty))
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

            if(vm.Password != null || vm.Password.Equals(string.Empty))
            {
                e.EmployeePassword = vm.Password;
            }

            if (vm.ManagerID != null || vm.ManagerID.Equals(string.Empty));
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