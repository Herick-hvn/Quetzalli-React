using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class OrdenVenta
    {
        public int IdordenVenta { get; set; }
        public int IdEmpleado { get; set; }
        public DateTime FechaVenta { get; set; }
        public string Estatus { get; set; } = null!;
    }
}
