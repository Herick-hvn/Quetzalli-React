using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class OrdenVentaProducto
    {
        public int IdordenVentaProducto { get; set; }
        public float Cantidad { get; set; }
        public DateTime Unidad { get; set; }
        public string Estatus { get; set; } = null!;
        public int IdOrdenVenta { get; set; }
        public int Idproducto { get; set; }
    }
}
