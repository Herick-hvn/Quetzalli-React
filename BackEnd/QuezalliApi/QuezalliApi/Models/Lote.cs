using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Lote
    {
        public int IdstockInsumo { get; set; }
        public string NoLote { get; set; } = null!;
        public DateTime FechaCaducidad { get; set; }
        public string Obesrvaciones { get; set; } = null!;
        public DateTime FechaObtencion { get; set; }
        public float Cantidad { get; set; }
        public string Unidad { get; set; } = null!;
        public string Estatus { get; set; } = null!;
    }
}
