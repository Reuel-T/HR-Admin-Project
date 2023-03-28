using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Hr_API.ViewModels
{
    /// <summary>
    ///     The Model to Create a new Employee
    /// </summary>
    public class CreateEmployeeModel
    {
        /// <summary>
        ///     The Employee's First Name
        /// </summary>
        /// <example>Bob</example>
        [Required]
        public string FirstName { get; set; } = string.Empty;
        /// <summary>
        ///     The Employee's Last Name
        /// </summary>
        /// <example>Example</example>
        public string LastName { get; set; } = string.Empty;
        /// <summary>
        ///     The Employee's Telephone Number
        /// </summary>
        /// <example>0123456789</example>
        [Phone]
        [Required]
        public string TelephoneNumber { get; set; } = string.Empty;
        /// <summary>
        ///     The Employee's Email Address
        /// </summary>
        /// <example>bob@email.com</example>
        [EmailAddress]
        [Required]
        public string EmailAddress { get; set; } = string.Empty;
        /// <summary>
        ///     The ID of another employee to be assigned as this employee's manager
        /// </summary>
        /// <example>null / 0</example>
        public int? ManagerID { get; set; } = null;
    }
}