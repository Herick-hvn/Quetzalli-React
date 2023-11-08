using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using QuezalliApi.Models.WarhouseModels;

namespace QuezalliApi.Models.WarhouseModels
{
    public partial class WarehouseDBContext : DbContext
    {
        public WarehouseDBContext()
        {
        }

        public WarehouseDBContext(DbContextOptions<WarehouseDBContext> options)
            : base(options)
        {
        }


        public DbSet<WarehouseInsumo> WarehouseInsumo { get; set; } = null!;
        public DbSet<WarehouseProducto> WarehouseProducto { get; set; } = null!;
        public DbSet<WarehouseCliente> WarehouseCliente { get; set; } = null!;
        public DbSet<WarehouseVenta> WarehouseVenta { get; set; } = null!;


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=.\\sqlexpress;Initial Catalog=warehouse;Integrated Security=True;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<WarehouseInsumo>(entity =>
            {
                entity.ToTable("insumosInventario");
                entity.HasKey(e => e.Id).HasName("id");
                entity.Property(e => e.NombreInsumo).IsRequired().HasMaxLength(255).HasColumnName("nombre_insumo");
                entity.Property(e => e.Cantidad).IsRequired().HasColumnName("cantidad");
                entity.Property(e => e.Fecha).IsRequired().HasColumnName("fecha");
            });

            modelBuilder.Entity<WarehouseProducto>(entity =>
            {
                entity.ToTable("productosInventario");
                entity.HasKey(e => e.Id).HasName("id");
                entity.Property(e => e.NombreProducto).IsRequired().HasMaxLength(255).HasColumnName("nombre_producto");
                entity.Property(e => e.Cantidad).IsRequired().HasColumnName("cantidad");
                entity.Property(e => e.Fecha).IsRequired().HasColumnName("fecha");
            });

            modelBuilder.Entity<WarehouseCliente>(entity =>
            {
                entity.ToTable("rankingClientes");
                entity.HasKey(e => e.Id).HasName("id");
                entity.Property(e => e.NombreCliente).IsRequired().HasMaxLength(255).HasColumnName("nombre_cliente");
                entity.Property(e => e.NumeroCompras).IsRequired().HasColumnName("numero_compras");
                entity.Property(e => e.Fecha).IsRequired().HasColumnName("fecha");
            });

            modelBuilder.Entity<WarehouseVenta>(entity =>
            {

                entity.ToTable("venta");
                entity.HasKey(e => e.IdVenta).HasName("idventa");
                entity.Property(e => e.NombreProducto).IsRequired().HasMaxLength(255).HasColumnName("nombreproducto");
                entity.Property(e => e.NumeroVentas).IsRequired().HasColumnName("numero_ventas");
                entity.Property(e => e.RecaudadoPorVenta).IsRequired().HasColumnType("decimal(10, 2)").HasColumnName("recuadado_por_venta");
                entity.Property(e => e.Fecha).IsRequired().HasColumnName("fecha");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
