using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Reservacion
    {
        public int Idreservacion { get; set; }
        public int IdCliente { get; set; }
        public int IdMesa { get; set; }
        public int IdHorario { get; set; }
    }
}
