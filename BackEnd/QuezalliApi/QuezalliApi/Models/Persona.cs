using System;
using System.Collections.Generic;

namespace QuezalliApi.Models
{
    public partial class Persona
    {
        public int Idpersona { get; set; }
        public string Nombre { get; set; } = null!;
        public string ApellidoP { get; set; } = null!;
        public string ApellidoM { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public int IdUsuario { get; set; }
    }
}
