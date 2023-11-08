using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuezalliApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "avisos",
                columns: table => new
                {
                    idavisos = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    titulo = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    nivelMinimoExistencias = table.Column<decimal>(type: "decimal(5,0)", nullable: false),
                    prioridad = table.Column<int>(type: "int", nullable: false),
                    estatus = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_avisos_idavisos", x => x.idavisos);
                });

            migrationBuilder.CreateTable(
                name: "avisos_insumos",
                columns: table => new
                {
                    idavisos_productos = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idaviso = table.Column<int>(type: "int", nullable: false),
                    idinsumos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_avisos_insumos_idavisos_productos", x => x.idavisos_productos);
                });

            migrationBuilder.CreateTable(
                name: "avisos_productos",
                columns: table => new
                {
                    idavisos_productos = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idaviso = table.Column<int>(type: "int", nullable: false),
                    idproducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_avisos_productos_idavisos_productos", x => x.idavisos_productos);
                });

            migrationBuilder.CreateTable(
                name: "bitacora",
                columns: table => new
                {
                    idbitacora = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idUsuario = table.Column<int>(type: "int", nullable: false),
                    movimiento = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    modulo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fecha = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bitacora_idbitacora", x => x.idbitacora);
                });

            migrationBuilder.CreateTable(
                name: "cliente",
                columns: table => new
                {
                    idcliente = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idPersona = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_cliente_idcliente", x => x.idcliente);
                });

            migrationBuilder.CreateTable(
                name: "empleado",
                columns: table => new
                {
                    idEmpleados = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rfc = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    idPuesto = table.Column<int>(type: "int", nullable: false),
                    idPersona = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_empleado_idEmpleados", x => x.idEmpleados);
                });

            migrationBuilder.CreateTable(
                name: "horario",
                columns: table => new
                {
                    idhorario = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    horaInicio = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false),
                    horaFin = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_horario_idhorario", x => x.idhorario);
                });

            migrationBuilder.CreateTable(
                name: "insumo",
                columns: table => new
                {
                    idinsumo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreInsumo = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    idProveedor = table.Column<int>(type: "int", nullable: false),
                    idStock = table.Column<int>(type: "int", nullable: false),
                    unidad = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    precio = table.Column<float>(type: "real", nullable: false),
                    estatus = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_insumo_idinsumo", x => x.idinsumo);
                });

            migrationBuilder.CreateTable(
                name: "insumo_lote",
                columns: table => new
                {
                    idproducto_lote = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idInsumo = table.Column<int>(type: "int", nullable: false),
                    idLote = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_insumo_lote_idproducto_lote", x => x.idproducto_lote);
                });

            migrationBuilder.CreateTable(
                name: "librorecetas",
                columns: table => new
                {
                    idlibroRecetas = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idProducto = table.Column<int>(type: "int", nullable: false),
                    idInsumo = table.Column<int>(type: "int", nullable: false),
                    cantidadInsumo = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_librorecetas_idlibroRecetas", x => x.idlibroRecetas);
                });

            migrationBuilder.CreateTable(
                name: "lote",
                columns: table => new
                {
                    idstockInsumo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    noLote = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    fechaCaducidad = table.Column<DateTime>(type: "date", nullable: false),
                    obesrvaciones = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    fechaObtencion = table.Column<DateTime>(type: "date", nullable: false),
                    cantidad = table.Column<float>(type: "real", nullable: false),
                    unidad = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: false),
                    estatus = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lote_idstockInsumo", x => x.idstockInsumo);
                });

            migrationBuilder.CreateTable(
                name: "mesa",
                columns: table => new
                {
                    idmesas = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mesa_idmesas", x => x.idmesas);
                });

            migrationBuilder.CreateTable(
                name: "orden_venta",
                columns: table => new
                {
                    idorden_venta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idEmpleado = table.Column<int>(type: "int", nullable: false),
                    fechaVenta = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false),
                    estatus = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orden_venta_idorden_venta", x => x.idorden_venta);
                });

            migrationBuilder.CreateTable(
                name: "orden_venta_producto",
                columns: table => new
                {
                    idorden_venta_producto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cantidad = table.Column<float>(type: "real", nullable: false),
                    unidad = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false),
                    estatus = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false),
                    id_orden_venta = table.Column<int>(type: "int", nullable: false),
                    idproducto = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orden_venta_producto_idorden_venta_producto", x => x.idorden_venta_producto);
                });

            migrationBuilder.CreateTable(
                name: "pedido",
                columns: table => new
                {
                    idPedidos = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idCliente = table.Column<int>(type: "int", nullable: false),
                    fechaPedido = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: false),
                    fechaEntrega = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true),
                    codigo = table.Column<int>(type: "int", nullable: false),
                    estatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pedido_idPedidos", x => x.idPedidos);
                });

            migrationBuilder.CreateTable(
                name: "pedido_producto",
                columns: table => new
                {
                    idpedido_producto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cantidad = table.Column<float>(type: "real", nullable: false),
                    unidad = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    idProducto = table.Column<int>(type: "int", nullable: false),
                    idPedidos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pedido_producto_idpedido_producto", x => x.idpedido_producto);
                });

            migrationBuilder.CreateTable(
                name: "persona",
                columns: table => new
                {
                    idpersona = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    apellidoP = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    apellidoM = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    telefono = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    idUsuario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_persona_idpersona", x => x.idpersona);
                });

            migrationBuilder.CreateTable(
                name: "producto",
                columns: table => new
                {
                    idproductos = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreProducto = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    foto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    costoProduccion = table.Column<float>(type: "real", nullable: false),
                    precioVenta = table.Column<float>(type: "real", nullable: false),
                    observaciones = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    cantidad = table.Column<int>(type: "int", nullable: false),
                    estatus = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_producto_idproductos", x => x.idproductos);
                });

            migrationBuilder.CreateTable(
                name: "producto_lote",
                columns: table => new
                {
                    idproducto_lote = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idProducto = table.Column<int>(type: "int", nullable: false),
                    idLote = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_producto_lote_idproducto_lote", x => x.idproducto_lote);
                });

            migrationBuilder.CreateTable(
                name: "proveedor",
                columns: table => new
                {
                    idproveedor = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombreEmpresa = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    nombreContacto = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    correo = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    telefono = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false),
                    estatus = table.Column<string>(type: "nvarchar(1)", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_proveedor_idproveedor", x => x.idproveedor);
                });

            migrationBuilder.CreateTable(
                name: "puesto",
                columns: table => new
                {
                    idpuesto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombrePuesto = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_puesto_idpuesto", x => x.idpuesto);
                });

            migrationBuilder.CreateTable(
                name: "reservacion",
                columns: table => new
                {
                    idreservacion = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idCliente = table.Column<int>(type: "int", nullable: false),
                    idMesa = table.Column<int>(type: "int", nullable: false),
                    idHorario = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservacion_idreservacion", x => x.idreservacion);
                });

            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "stock",
                columns: table => new
                {
                    idstock = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cantidadDisonible = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_stock_idstock", x => x.idstock);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rol = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    active = table.Column<short>(type: "smallint", nullable: true),
                    confirmed_at = table.Column<DateTime>(type: "datetime2(0)", precision: 0, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "users_roles",
                columns: table => new
                {
                    userId = table.Column<int>(type: "int", nullable: true),
                    roleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateIndex(
                name: "user$email",
                table: "user",
                column: "email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "avisos");

            migrationBuilder.DropTable(
                name: "avisos_insumos");

            migrationBuilder.DropTable(
                name: "avisos_productos");

            migrationBuilder.DropTable(
                name: "bitacora");

            migrationBuilder.DropTable(
                name: "cliente");

            migrationBuilder.DropTable(
                name: "empleado");

            migrationBuilder.DropTable(
                name: "horario");

            migrationBuilder.DropTable(
                name: "insumo");

            migrationBuilder.DropTable(
                name: "insumo_lote");

            migrationBuilder.DropTable(
                name: "librorecetas");

            migrationBuilder.DropTable(
                name: "lote");

            migrationBuilder.DropTable(
                name: "mesa");

            migrationBuilder.DropTable(
                name: "orden_venta");

            migrationBuilder.DropTable(
                name: "orden_venta_producto");

            migrationBuilder.DropTable(
                name: "pedido");

            migrationBuilder.DropTable(
                name: "pedido_producto");

            migrationBuilder.DropTable(
                name: "persona");

            migrationBuilder.DropTable(
                name: "producto");

            migrationBuilder.DropTable(
                name: "producto_lote");

            migrationBuilder.DropTable(
                name: "proveedor");

            migrationBuilder.DropTable(
                name: "puesto");

            migrationBuilder.DropTable(
                name: "reservacion");

            migrationBuilder.DropTable(
                name: "role");

            migrationBuilder.DropTable(
                name: "stock");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "users_roles");
        }
    }
}
