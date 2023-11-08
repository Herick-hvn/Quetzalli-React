using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Libroreceta
    {
        public int IdlibroRecetas { get; set; }
        public int IdProducto { get; set; }
        public int IdInsumo { get; set; }
        public float? CantidadInsumo { get; set; }
    }
}
