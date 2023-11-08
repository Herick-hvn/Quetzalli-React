using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Rol { get; set; } = null!;
        public short? Active { get; set; }
        public DateTime? ConfirmedAt { get; set; }
    }
}
