using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    /// <summary>
    ///     Model that holds the properties to create a new Department
    /// </summary>
    public class CreateDepartmentViewModel
    {
        /// <summary>
        ///     The Name of the Department to be created
        /// </summary>
        public string DepartmentName { get; set; } = string.Empty;
    }
}