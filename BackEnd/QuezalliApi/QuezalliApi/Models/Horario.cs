using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Horario
    {
        public int Idhorario { get; set; }
        public DateTime HoraInicio { get; set; }
        public DateTime HoraFin { get; set; }
    }
}
