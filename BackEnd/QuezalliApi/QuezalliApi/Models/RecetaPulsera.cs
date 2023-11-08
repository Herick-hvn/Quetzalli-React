using System.ComponentModel.DataAnnotations;

namespace QuezalliApi.Models
{
    public class RecetaPulsera
    {

        [Key]
        public int IdRecetaPulsera { get; set; }

        
        public string Nombre { get; set; } = null!;

        
        public string Descripcion { get; set; } = null!;

        
        public string Foto { get; set; } = null!;

        public float CostoProduccion { get; set; }

        public float PrecioVenta { get; set; }

        public string Observaciones { get; set; } = null!;



        [Required]
        public string Estatus { get; set; } = null!;



    }
}
