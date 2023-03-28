using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hr_API.ViewModels
{
    /// <summary>
    /// Model for Logging in a User
    /// </summary>
    public class LoginModel
    {
        /// <summary>
        ///     User's Email Address
        /// </summary>
        /// <example>hradmin@test.com</example>
        public string Username { get; set; } = string.Empty;

        /// <summary>
        ///     User's Password
        /// </summary>
        /// <example>TestPass1234</example>
        public string Password { get; set; } = string.Empty;
    }
}