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
        /// <summary>
        ///     Method to edit an employee using information from an EditEmployeeVM object
        /// </summary>
        /// <param name="vm">The EditEmployeeVM object</param>
        /// <param name="e">The Employee to edit</param>
        /// <returns>The updated employee object</returns>
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
                    if(newManagerID ==-1)
                    {
                        e.EmployeeManagerId = null;
                    }else
                    {
                        e.EmployeeManagerId = newManagerID;
                    }
                }
            }

            return e;
        }

        /// <summary>
        ///     Method to edit a department using information from an EditDepartmentVM object
        /// </summary>
        /// <param name="vm">The EditDepartmentVM object</param>
        /// <param name="d">The Department to edit</param>
        /// <returns>The updated department object</returns>
        public static Department DepartmentEdit(EditDepartmentVM vm, Department d)
        {
            if(vm.DepartmentName != null)
            {
                d.DepartmentName = vm.DepartmentName;
            }

            if (vm.Status != null)
            {
                d.DepartmentStatus = vm.Status.Value;
            }

            return d;
        }
    }
}