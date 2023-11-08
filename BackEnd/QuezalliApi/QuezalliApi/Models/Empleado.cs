using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Empleado
    {
        public int IdEmpleados { get; set; }
        public string Rfc { get; set; } = null!;
        public int IdPuesto { get; set; }
        public int IdPersona { get; set; }
    }
}
