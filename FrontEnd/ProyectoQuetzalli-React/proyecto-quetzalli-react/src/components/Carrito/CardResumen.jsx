import "./styles.css";
import Swal from "sweetalert2";

const CardResumen = ({ carrito, idCliente, onPedidoSuccess }) => {
  const totalCantidad = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  console.log(carrito);

  const datosCarrito = carrito;

  const postPedido = async () => {
    const url = `https://localhost:7239/api/Pedidos`;

    const fechaPedido = new Date();
    const fechaEntrega = new Date(fechaPedido); // Crea una copia de la fecha de pedido

    // Agrega dos días a la fecha de entrega
    fechaEntrega.setDate(fechaEntrega.getDate() + 5);

    const fechaPedidoFormateada = fechaPedido.toISOString();
    const fechaEntregaFormateada = fechaEntrega.toISOString();

    try {
      const data = {
        idPedidos: 0,
        idCliente: idCliente,
        fechaPedido: `${fechaPedidoFormateada}`,
        fechaEntrega: `${fechaEntregaFormateada}`,
        total: totalCarrito,
        estatus: 1,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al generar el pedio");
      }

      const res = await response.json();
      const { idPedidos } = res;
      console.log(idPedidos);
      // Llama a la función de éxito después de realizar el pedido
      for(let i = 0; i < datosCarrito.length;i++){
        const {cantidad, idProducto} = datosCarrito[i];
        console.log(`En la posición ${i} la cantidad es: ${cantidad} y el id es: ${idProducto}`);
        await postPedidoProductos(idProducto,idPedidos,cantidad);
      }
      onPedidoSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const postPedidoProductos = async (idProducto, idPedidos, cantidad) => {
    const url = `https://localhost:7239/api/PedidoProductos`;
    try {
      const data = {
        idpedidoProducto: 0,
        cantidad: cantidad,
        unidad: "string",
        idProducto: idProducto,
        idPedidos: idPedidos,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al mandar los productos al pedido");
      }

      console.log("Datos enviados");
    } catch (error) {
      console.log(error);
    }
  };

  const confirmPedido = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn custom-button-success m-2",
        cancelButton: "btn custom-button-delete m-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro de que deseas completar la compra?",
        text: "Una vez confirmado no se podra cambiar el carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Confirmar!",
        cancelButtonText: "No, Cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          postPedido();
          swalWithBootstrapButtons.fire({
            title: "Compra Completada!",
            text: "Puedes revisarla en el apartado de pedidos",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Compra no realizada",
            text: "Cuando estes listo realiza tu compra",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="col-3 mx-auto">
      <div className="card mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-header">Resumen de carrito</div>
        <div className="card-body">
          <article className="item">
            <p className="card-title flavor">Productos</p>
            {/* Puedes mostrar el total del carrito directamente aquí */}
            <p className="price text-success">{totalCantidad}</p>
          </article>
          <article className="item">
            <p className="card-text flavor">Total:</p>
            {/* También puedes mostrar el total del carrito directamente aquí */}
            <p className="price text-success">${totalCarrito}</p>
          </article>
          <div className="text-center">
            <button
              type="button"
              className="btn custom-button"
              onClick={confirmPedido}
            >
              Continuar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResumen;
