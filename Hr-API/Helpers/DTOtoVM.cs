using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hr_API.Models;
using Hr_API.ViewModels;

namespace Hr_API.Helpers
{
    public static class DTOtoVM
    {
        public static EmployeeVM EmployeeVM(Employee employee)
        {
            EmployeeVM result = new EmployeeVM
            {
                EmployeeID = employee.EmployeeId,
                FirstName = employee.EmployeeFirstName,
                LastName = employee.EmployeeSurname,
                TelephoneNumber = employee.EmployeeTelephoneNumber,
                EmailAddress = employee.EmployeeEmailAddress,
                Role = employee.EmployeeRole,
                Status = employee.EmployeeStatus,
                ManagerID = employee.EmployeeManagerId
            };

            if (employee.EmployeeManager != null)
            {
                result.ManagerName = $"{employee.EmployeeManager.EmployeeFirstName} {employee.EmployeeManager.EmployeeSurname}";
            }

            //use this to check if the employee is assigned to departments
            var department = employee.DepartmentEmployees;

            //if the employee is assigned to any departments
            if (department.Count() != 0 || department != null)
            {
                List<EmployeeDepartmentVM> departments = new List<EmployeeDepartmentVM>();

                employee.DepartmentEmployees.ToList()
                    .ForEach(x =>
                    {
                        departments.Add(EmployeeDepartmentVM(x));
                    });
                result.Departments = departments;
            }

            return result;
        }

        public static DepartmentVM DepartmentVM(Department department)
        {
            return new DepartmentVM
            {
                DepartmentID = department.DepartmentId,
                DepartmentName = department.DepartmentName,
                DepartmentStatus = department.DepartmentStatus
            };
        }

        public static EmployeeDepartmentVM EmployeeDepartmentVM(DepartmentEmployee departmentEmployee){
            return new EmployeeDepartmentVM { 
                id = departmentEmployee.DepartmentId.Value,
                DepartmentName = departmentEmployee.Department.DepartmentName,
                Status = departmentEmployee.Department.DepartmentStatus,
                IsManager = departmentEmployee.DepartmentManager
            };
        }

        public static ManagerVM ManagerVM(Employee employee){
            return new ManagerVM
            {
                ID = employee.EmployeeId,
                name = $"{employee.EmployeeFirstName} {employee.EmployeeSurname}"
            };
        }

    }
}