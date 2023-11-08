using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Proveedor
    {
        public int Idproveedor { get; set; }
        public string NombreEmpresa { get; set; } = null!;
        public string NombreContacto { get; set; } = null!;
        public string Correo { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Estatus { get; set; } = null!;
    }
}
