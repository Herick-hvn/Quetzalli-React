using System.ComponentModel.DataAnnotations;

namespace QuezalliApi.Models
{
    public class Carrito
    {
        [Key]
        public int IdCarrito { get; set; }
        public int IdCliente { get; set; }
        public int IdProducto { get; set; }
        public string NombreProducto { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
        public double Precio { get; set; }
        public string Foto {  get; set; }
    }



}
