using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Insumo
    {
        public int Idinsumo { get; set; }
        public string NombreInsumo { get; set; } = null!;
        public int IdProveedor { get; set; }
        public int Cantidad { get; set; }
        public string Unidad { get; set; } = null!;
        public float Precio { get; set; }
        public string Estatus { get; set; } = null!;
    }
}
