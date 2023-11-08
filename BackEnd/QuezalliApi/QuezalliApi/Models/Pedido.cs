using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Pedido
    {
        public int IdPedidos { get; set; }
        public int IdCliente { get; set; }
        public DateTime FechaPedido { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public int Codigo { get; set; }
        public int Estatus { get; set; }
    }
}
