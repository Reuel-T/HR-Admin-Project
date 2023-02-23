using System;
using System.Collections.Generic;

namespace Hr_API.Models;

public partial class Department
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = null!;

    public bool DepartmentStatus { get; set; }

    public virtual ICollection<DepartmentEmployee> DepartmentEmployees { get; } = new List<DepartmentEmployee>();
}
