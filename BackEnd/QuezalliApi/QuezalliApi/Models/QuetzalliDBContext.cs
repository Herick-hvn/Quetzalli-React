using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace QuezalliApi.Models
{
    public partial class QuetzalliDBContext : DbContext
    {
        public QuetzalliDBContext()
        {
        }

        public QuetzalliDBContext(DbContextOptions<QuetzalliDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Aviso> Avisos { get; set; } = null!;
        public virtual DbSet<AvisosInsumo> AvisosInsumos { get; set; } = null!;
        public virtual DbSet<AvisosProducto> AvisosProductos { get; set; } = null!;
        public virtual DbSet<Bitacora> Bitacoras { get; set; } = null!;
        public virtual DbSet<Cliente> Clientes { get; set; } = null!;
        public virtual DbSet<Empleado> Empleados { get; set; } = null!;
        public virtual DbSet<Horario> Horarios { get; set; } = null!;
        public virtual DbSet<Insumo> Insumos { get; set; } = null!;
        public virtual DbSet<InsumoLote> InsumoLotes { get; set; } = null!;
        public virtual DbSet<Libroreceta> Librorecetas { get; set; } = null!;
        public virtual DbSet<Lote> Lotes { get; set; } = null!;
        public virtual DbSet<Mesa> Mesas { get; set; } = null!;
        public virtual DbSet<OrdenVentaProducto> OrdenVentaProductos { get; set; } = null!;
        public virtual DbSet<OrdenVenta> OrdenVenta { get; set; } = null!;
        public virtual DbSet<Pedido> Pedidos { get; set; } = null!;
        public virtual DbSet<PedidoProducto> PedidoProductos { get; set; } = null!;
        public virtual DbSet<Persona> Personas { get; set; } = null!;
        public virtual DbSet<Producto> Productos { get; set; } = null!;
        public virtual DbSet<ProductoLote> ProductoLotes { get; set; } = null!;
        public virtual DbSet<Proveedor> Proveedors { get; set; } = null!;
        public virtual DbSet<Puesto> Puestos { get; set; } = null!;
        public virtual DbSet<Reservacion> Reservacions { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Stock> Stocks { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UsersRole> UsersRoles { get; set; } = null!;
        public DbSet<RecetaPulsera> NuevosModelos { get; set; }

        public DbSet<PulseraMaterial> PulseraMateriales { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=.\\sqlexpress;Initial Catalog=QuetzalliDB;Integrated Security=True;TrustServerCertificate=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aviso>(entity =>
            {
                entity.HasKey(e => e.Idavisos)
                    .HasName("PK_avisos_idavisos");

                entity.ToTable("avisos");

                entity.Property(e => e.Idavisos).HasColumnName("idavisos");

                entity.Property(e => e.Descripcion).HasColumnName("descripcion");

                entity.Property(e => e.Estatus)
                    .HasMaxLength(1)
                    .HasColumnName("estatus");

                entity.Property(e => e.NivelMinimoExistencias)
                    .HasColumnType("decimal(5, 0)")
                    .HasColumnName("nivelMinimoExistencias");

                entity.Property(e => e.Prioridad).HasColumnName("prioridad");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(45)
                    .HasColumnName("titulo");
            });

            modelBuilder.Entity<AvisosInsumo>(entity =>
            {
                entity.HasKey(e => e.IdavisosProductos)
                    .HasName("PK_avisos_insumos_idavisos_productos");

                entity.ToTable("avisos_insumos");

                entity.Property(e => e.IdavisosProductos).HasColumnName("idavisos_productos");

                entity.Property(e => e.Idaviso).HasColumnName("idaviso");

                entity.Property(e => e.Idinsumos).HasColumnName("idinsumos");
            });

            modelBuilder.Entity<AvisosProducto>(entity =>
            {
                entity.HasKey(e => e.IdavisosProductos)
                    .HasName("PK_avisos_productos_idavisos_productos");

                entity.ToTable("avisos_productos");

                entity.Property(e => e.IdavisosProductos).HasColumnName("idavisos_productos");

                entity.Property(e => e.Idaviso).HasColumnName("idaviso");

                entity.Property(e => e.Idproducto).HasColumnName("idproducto");
            });

            modelBuilder.Entity<Bitacora>(entity =>
            {
                entity.HasKey(e => e.Idbitacora)
                    .HasName("PK_bitacora_idbitacora");

                entity.ToTable("bitacora");

                entity.Property(e => e.Idbitacora).HasColumnName("idbitacora");

                entity.Property(e => e.Fecha)
                    .HasPrecision(0)
                    .HasColumnName("fecha");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Modulo)
                    .HasMaxLength(50)
                    .HasColumnName("modulo");

                entity.Property(e => e.Movimiento)
                    .HasMaxLength(50)
                    .HasColumnName("movimiento");

                entity.Property(e => e.Observaciones).HasColumnName("observaciones");
            });

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.Idcliente)
                    .HasName("PK_cliente_idcliente");

                entity.ToTable("cliente");

                entity.Property(e => e.Idcliente).HasColumnName("idcliente");

                entity.Property(e => e.IdPersona).HasColumnName("idPersona");
            });

            modelBuilder.Entity<Empleado>(entity =>
            {
                entity.HasKey(e => e.IdEmpleados)
                    .HasName("PK_empleado_idEmpleados");

                entity.ToTable("empleado");

                entity.Property(e => e.IdEmpleados).HasColumnName("idEmpleados");

                entity.Property(e => e.IdPersona).HasColumnName("idPersona");

                entity.Property(e => e.IdPuesto).HasColumnName("idPuesto");

                entity.Property(e => e.Rfc)
                    .HasMaxLength(45)
                    .HasColumnName("rfc");
            });

            modelBuilder.Entity<Horario>(entity =>
            {
                entity.HasKey(e => e.Idhorario)
                    .HasName("PK_horario_idhorario");

                entity.ToTable("horario");

                entity.Property(e => e.Idhorario).HasColumnName("idhorario");

                entity.Property(e => e.HoraFin)
                    .HasPrecision(0)
                    .HasColumnName("horaFin");

                entity.Property(e => e.HoraInicio)
                    .HasPrecision(0)
                    .HasColumnName("horaInicio");
            });

            modelBuilder.Entity<Insumo>(entity =>
            {
                entity.HasKey(e => e.Idinsumo)
                    .HasName("PK_insumo_idinsumo");

                entity.ToTable("insumo");

                entity.Property(e => e.Idinsumo).HasColumnName("idinsumo");

                entity.Property(e => e.Estatus)
                    .HasMaxLength(1)
                    .HasColumnName("estatus");

                entity.Property(e => e.IdProveedor).HasColumnName("idProveedor");

                entity.Property(e => e.Cantidad).HasColumnName("idStock");

                entity.Property(e => e.NombreInsumo)
                    .HasMaxLength(100)
                    .HasColumnName("nombreInsumo");

                entity.Property(e => e.Precio).HasColumnName("precio");

                entity.Property(e => e.Unidad)
                    .HasMaxLength(10)
                    .HasColumnName("unidad");
            });

            modelBuilder.Entity<InsumoLote>(entity =>
            {
                entity.HasKey(e => e.IdproductoLote)
                    .HasName("PK_insumo_lote_idproducto_lote");

                entity.ToTable("insumo_lote");

                entity.Property(e => e.IdproductoLote).HasColumnName("idproducto_lote");

                entity.Property(e => e.IdInsumo).HasColumnName("idInsumo");

                entity.Property(e => e.IdLote).HasColumnName("idLote");
            });

            modelBuilder.Entity<Libroreceta>(entity =>
            {
                entity.HasKey(e => e.IdlibroRecetas)
                    .HasName("PK_librorecetas_idlibroRecetas");

                entity.ToTable("librorecetas");

                entity.Property(e => e.IdlibroRecetas).HasColumnName("idlibroRecetas");

                entity.Property(e => e.CantidadInsumo).HasColumnName("cantidadInsumo");

                entity.Property(e => e.IdInsumo).HasColumnName("idInsumo");

                entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            });

            modelBuilder.Entity<Lote>(entity =>
            {
                entity.HasKey(e => e.IdstockInsumo)
                    .HasName("PK_lote_idstockInsumo");

                entity.ToTable("lote");

                entity.Property(e => e.IdstockInsumo).HasColumnName("idstockInsumo");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.Estatus)
                    .HasMaxLength(1)
                    .HasColumnName("estatus");

                entity.Property(e => e.FechaCaducidad)
                    .HasColumnType("date")
                    .HasColumnName("fechaCaducidad");

                entity.Property(e => e.FechaObtencion)
                    .HasColumnType("date")
                    .HasColumnName("fechaObtencion");

                entity.Property(e => e.NoLote)
                    .HasMaxLength(10)
                    .HasColumnName("noLote");

                entity.Property(e => e.Obesrvaciones).HasColumnName("obesrvaciones");

                entity.Property(e => e.Unidad)
                    .HasMaxLength(5)
                    .HasColumnName("unidad");
            });

            modelBuilder.Entity<Mesa>(entity =>
            {
                entity.HasKey(e => e.Idmesas)
                    .HasName("PK_mesa_idmesas");

                entity.ToTable("mesa");

                entity.Property(e => e.Idmesas).HasColumnName("idmesas");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(45)
                    .HasColumnName("descripcion");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(45)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<OrdenVentaProducto>(entity =>
            {
                entity.HasKey(e => e.IdordenVentaProducto)
                    .HasName("PK_orden_venta_producto_idorden_venta_producto");

                entity.ToTable("orden_venta_producto");

                entity.Property(e => e.IdordenVentaProducto).HasColumnName("idorden_venta_producto");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.Estatus)
                    .HasMaxLength(1)
                    .HasColumnName("estatus");

                entity.Property(e => e.IdOrdenVenta).HasColumnName("id_orden_venta");

                entity.Property(e => e.Idproducto).HasColumnName("idproducto");

                entity.Property(e => e.Unidad)
                    .HasPrecision(0)
                    .HasColumnName("unidad");
            });

            modelBuilder.Entity<OrdenVenta>(entity =>
            {
                entity.HasKey(e => e.IdordenVenta)
                    .HasName("PK_orden_venta_idorden_venta");

                entity.ToTable("orden_venta");

                entity.Property(e => e.IdordenVenta).HasColumnName("idorden_venta");

                entity.Property(e => e.Estatus)
                    .HasMaxLength(1)
                    .HasColumnName("estatus");

                entity.Property(e => e.FechaVenta)
                    .HasPrecision(0)
                    .HasColumnName("fechaVenta");

                entity.Property(e => e.IdEmpleado).HasColumnName("idEmpleado");
            });

            modelBuilder.Entity<Pedido>(entity =>
            {
                entity.HasKey(e => e.IdPedidos)
                    .HasName("PK_pedido_idPedidos");

                entity.ToTable("pedido");

                entity.Property(e => e.IdPedidos).HasColumnName("idPedidos");

                entity.Property(e => e.Codigo).HasColumnName("codigo");

                entity.Property(e => e.Estatus).HasColumnName("estatus");

                entity.Property(e => e.FechaEntrega)
                    .HasPrecision(0)
                    .HasColumnName("fechaEntrega");

                entity.Property(e => e.FechaPedido)
                    .HasPrecision(0)
                    .HasColumnName("fechaPedido");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");
            });

            modelBuilder.Entity<PedidoProducto>(entity =>
            {
                entity.HasKey(e => e.IdpedidoProducto)
                    .HasName("PK_pedido_producto_idpedido_producto");

                entity.ToTable("pedido_producto");

                entity.Property(e => e.IdpedidoProducto).HasColumnName("idpedido_producto");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.IdPedidos).HasColumnName("idPedidos");

                entity.Property(e => e.IdProducto).HasColumnName("idProducto");

                entity.Property(e => e.Unidad)
                    .HasMaxLength(10)
                    .HasColumnName("unidad");
            });

            modelBuilder.Entity<Persona>(entity =>
            {
                entity.HasKey(e => e.Idpersona)
                    .HasName("PK_persona_idpersona");

                entity.ToTable("persona");

                entity.Property(e => e.Idpersona).HasColumnName("idpersona");

                entity.Property(e => e.ApellidoM)
                    .HasMaxLength(100)
                    .HasColumnName("apellidoM");

                entity.Property(e => e.ApellidoP)
                    .HasMaxLength(100)
                    .HasColumnName("apellidoP");

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .HasColumnName("nombre");

                entity.Property(e => e.Telefono)
                    .HasMaxLength(45)
                    .HasColumnName("telefono");
            });

            modelBuilder.Entity<Producto>(entity =>
            {
                entity.HasKey(e => e.Idproductos)
                    .HasName("PK_producto_idproductos");

                entity.ToTable("producto");

                entity.Property(e => e.Idproductos).HasColumnName("idproductos");

                entity.Property(e => e.CostoProduccion).HasColumnName("costoProduccion");

                entity.Property(e => e.Descripcion).HasColumnName("descripcion");

                entity.Property(e => e.Estatus)
                    .HasMaxLength(1)
                    .HasColumnName("estatus");

                entity.Property(e => e.Foto).HasColumnName("foto");

                entity.Property(e => e.Cantidad).HasColumnName("cantidad");

                entity.Property(e => e.NombreProducto)
                    .HasMaxLength(45)
                    .HasColumnName("nombreProducto");

                entity.Property(e => e.Observaciones).HasColumnName("observaciones");

                entity.Property(e => e.PrecioVenta).HasColumnName("precioVenta");
            });

            modelBuilder.Entity<ProductoLote>(entity =>
            {
                entity.HasKey(e => e.IdproductoLote)
                    .HasName("PK_producto_lote_idproducto_lote");

                entity.ToTable("producto_lote");

                entity.Property(e => e.IdproductoLote).HasColumnName("idproducto_lote");

                entity.Property(e => e.IdLote).HasColumnName("idLote");

                entity.Property(e => e.IdProducto).HasColumnName("idProducto");
            });

            modelBuilder.Entity<Proveedor>(entity =>
            {
                entity.HasKey(e => e.Idproveedor)
                    .HasName("PK_proveedor_idproveedor");

                entity.ToTable("proveedor");

                entity.Property(e => e.Idproveedor).HasColumnName("idproveedor");

                entity.Property(e => e.Estatus)
                    .HasMaxLength(1)
                    .HasColumnName("estatus");


                entity.Property(e => e.NombreEmpresa)
                    .HasMaxLength(45)
                    .HasColumnName("nombreEmpresa");

                entity.Property(e => e.NombreContacto)
                    .HasMaxLength(45)
                    .HasColumnName("nombreContacto");

                entity.Property(e => e.Correo)
                    .HasMaxLength(45)
                    .HasColumnName("correo");
                entity.Property(e => e.Telefono)
                   .HasMaxLength(45)
                   .HasColumnName("telefono");
            });

            modelBuilder.Entity<Puesto>(entity =>
            {
                entity.HasKey(e => e.Idpuesto)
                    .HasName("PK_puesto_idpuesto");

                entity.ToTable("puesto");

                entity.Property(e => e.Idpuesto).HasColumnName("idpuesto");

                entity.Property(e => e.NombrePuesto)
                    .HasMaxLength(45)
                    .HasColumnName("nombrePuesto");
            });

            modelBuilder.Entity<Reservacion>(entity =>
            {
                entity.HasKey(e => e.Idreservacion)
                    .HasName("PK_reservacion_idreservacion");

                entity.ToTable("reservacion");

                entity.Property(e => e.Idreservacion).HasColumnName("idreservacion");

                entity.Property(e => e.IdCliente).HasColumnName("idCliente");

                entity.Property(e => e.IdHorario).HasColumnName("idHorario");

                entity.Property(e => e.IdMesa).HasColumnName("idMesa");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.HasKey(e => e.Idstock)
                    .HasName("PK_stock_idstock");

                entity.ToTable("stock");

                entity.Property(e => e.Idstock).HasColumnName("idstock");

                entity.Property(e => e.CantidadDisonible).HasColumnName("cantidadDisonible");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.Email, "user$email")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Active).HasColumnName("active");

                entity.Property(e => e.ConfirmedAt)
                    .HasPrecision(0)
                    .HasColumnName("confirmed_at");

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.Password).HasColumnName("password");
            });

            modelBuilder.Entity<UsersRole>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("users_roles");

                entity.Property(e => e.RoleId).HasColumnName("roleId");

                entity.Property(e => e.UserId).HasColumnName("userId");
            });

            modelBuilder.Entity<RecetaPulsera>(entity =>
            {
                entity.ToTable("recetas_pulseras");

                entity.HasKey(e => e.IdRecetaPulsera)
                    .HasName("PK_pulsera_material_idPulseraMaterial");

                
                entity.Property(e => e.IdRecetaPulsera).HasColumnName("IdRecetaPulsera");

                entity.Property(e => e.CostoProduccion).HasColumnName("CostoProduccion");

                entity.Property(e => e.Descripcion).HasColumnName("Descripcion");

                entity.Property(e => e.Estatus)
                    .HasMaxLength(1)
                    .HasColumnName("Estatus");

                entity.Property(e => e.Foto).HasColumnName("Foto");


                entity.Property(e => e.Nombre)
                    .HasMaxLength(45)
                    .HasColumnName("Nombre");

                entity.Property(e => e.Observaciones).HasColumnName("observaciones");

                entity.Property(e => e.PrecioVenta).HasColumnName("precioVenta");
            });

            modelBuilder.Entity<PulseraMaterial>(entity =>
            {
                entity.ToTable("pulsera_material");

                entity.HasKey(e => e.IdPulseraMaterial).HasName("idPulseraMaterial");

                entity.Property(e => e.IdPulseraMaterial).HasColumnName("idPulseraMaterial");

                entity.Property(e => e.IdRecetaPulsera).HasColumnName("idRecetaPulsera");
                entity.Property(e => e.IdMaterial).HasColumnName("idMaterial");
                entity.Property(e => e.Cantidad).HasColumnName("cantidad");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
