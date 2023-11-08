namespace QuezalliApi.Models.WarhouseModels
{
    public class WarehouseVenta
    {
        public int IdVenta { get; set; }
        public string NombreProducto { get; set; }
        public int NumeroVentas { get; set; }
        public decimal RecaudadoPorVenta { get; set; }
        public DateTime Fecha { get; set; }
    }
}
