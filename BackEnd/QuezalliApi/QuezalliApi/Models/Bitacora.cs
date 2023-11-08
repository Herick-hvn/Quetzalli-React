using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Bitacora
    {
        public int Idbitacora { get; set; }
        public int IdUsuario { get; set; }
        public string Movimiento { get; set; } = null!;
        public string Modulo { get; set; } = null!;
        public string Observaciones { get; set; } = null!;
        public DateTime Fecha { get; set; }
    }
}
