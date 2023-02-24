using System;
using System.Collections.Generic;

namespace Hr_API.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string EmployeeFirstName { get; set; } = null!;

    public string EmployeeSurname { get; set; } = null!;

    public string? EmployeeTelephoneNumber { get; set; }

    public string EmployeeEmailAddress { get; set; } = null!;

    public byte EmployeeRole { get; set; }

    public bool EmployeeStatus { get; set; }

    public string EmployeePassword { get; set; } = null!;

    public int? EmployeeManagerId { get; set; }

    public virtual ICollection<DepartmentEmployee> DepartmentEmployees { get; } = new List<DepartmentEmployee>();

    public virtual Employee? EmployeeManager { get; set; }

    public virtual ICollection<Employee> InverseEmployeeManager { get; } = new List<Employee>();
}
