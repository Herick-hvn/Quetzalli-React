using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Mesa
    {
        public int Idmesas { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
    }
}
