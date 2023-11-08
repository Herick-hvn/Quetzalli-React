using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Aviso
    {
        public int Idavisos { get; set; }
        public string Titulo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public decimal NivelMinimoExistencias { get; set; }
        public int Prioridad { get; set; }
        public string Estatus { get; set; } = null!;
    }
}
