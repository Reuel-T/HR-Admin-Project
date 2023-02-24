using System;
using System.Collections.Generic;

namespace Hr_API.Models;

public partial class DepartmentEmployee
{
    public int DepartmentEmployeeId { get; set; }

    public int? EmployeeId { get; set; }

    public int? DepartmentId { get; set; }

    public bool DepartmentManager { get; set; }

    public virtual Department? Department { get; set; }

    public virtual Employee? Employee { get; set; }
}
