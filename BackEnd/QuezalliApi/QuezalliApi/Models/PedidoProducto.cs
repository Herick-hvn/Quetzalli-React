using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class PedidoProducto
    {
        public int IdpedidoProducto { get; set; }
        public float Cantidad { get; set; }
        public string Unidad { get; set; } = null!;
        public int IdProducto { get; set; }
        public int IdPedidos { get; set; }
    }
}
