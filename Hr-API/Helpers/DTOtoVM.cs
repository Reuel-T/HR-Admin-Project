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
                result.ManagerID = employee.EmployeeManager.EmployeeManagerId;
                result.ManagerName = $"{employee.EmployeeManager.EmployeeFirstName} {employee.EmployeeManager.EmployeeSurname}";
            }

            //use this to check if the employee is assigned to departments
            var department = employee.DepartmentEmployees;

            //if the employee is assigned to any departments
            if (department.Count() != 0 || department != null)
            {
                List<DepartmentModel> departments = new List<DepartmentModel>();

                employee.DepartmentEmployees.ToList()
                    .ForEach(x =>
                    {
                        departments.Add(new DepartmentModel
                        {
                            DepartmentID = x.DepartmentId.Value,
                            DepartmentName = x.Department.DepartmentName
                        });
                    });
                result.Departments = departments;
            }

            return result;
        }
    }
}