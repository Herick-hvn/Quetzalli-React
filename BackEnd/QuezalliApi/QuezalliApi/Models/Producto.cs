using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Producto
    {
        public int Idproductos { get; set; }
        public string NombreProducto { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public string Foto { get; set; } = null!;
        public float CostoProduccion { get; set; }
        public float PrecioVenta { get; set; }
        public string Observaciones { get; set; } = null!;
        public int Cantidad{ get; set; }
        public string Estatus { get; set; } = null!;
    }
}
