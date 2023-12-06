import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBarPrincipal/NavBar";
import CardCarrito from "../../../components/Carrito/CardCarrito";
import "./styles.css";
import NoProducts from "../../../components/Carrito/NoProducts";
import CardResumen from "../../../components/Carrito/CardResumen";
import Swal from "sweetalert2";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const idCliente = sessionStorage.getItem('idCliente');
  const getCarrito = async () => {
    const url = `https://localhost:7239/api/Carrito/${idCliente}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setCarrito([]);
        throw new Error("Error al obtener carrito");
      }

      const data = await response.json();
      setCarrito(data);
      console.log("El carrito ha cambiado:", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarrito();
  }, [idCliente]);

  const deleteCarrito = async (idC, idP, nombreProducto) => {
    const url = `https://localhost:7239/api/Carrito/${idC}/${idP}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Error al eliminar");
        Swal.fire(
          "¡El producto no se eliminó del carrito!",
          `Este producto ${nombreProducto} no se eliminó de tu carrito`,
          "warning"
        );
      } else {
        getCarrito();
        Swal.fire(
          "¡Producto eliminado del carrito!",
          `Este producto ${nombreProducto} se ha eliminado de tu carrito`,
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCantidadChange = (idProducto, nuevaCantidad) => {
    console.log(`Cambio en cantidad. ID del producto: ${idProducto}, Nueva cantidad: ${nuevaCantidad}`);
    
    // Actualiza la cantidad en el estado del carrito
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.idProducto === idProducto
          ? { ...producto, cantidad: nuevaCantidad }
          : producto
      )
    );
  };

  const handlePedidoSuccess = () => {
    // Esta función se ejecutará después de realizar el pedido
    // Puedes realizar cualquier actualización del estado necesario aquí
    setCarrito([]);
    console.log("Carrito actualizado después de realizar el pedido");
  };
  

  return (
    <>
      <NavBar />

      {carrito.length === 0 ? (
              <NoProducts />
            ):
            <div className="container-fluid mt-3" style={{fontFamily: "serif"}}>
              <div className="row">
              <div className="col-9 d-flex flex-wrap">
                {
                  carrito.map((producto) => {
                    const { nombreProducto, precio, descripcion, foto, idProducto,cantidad} =
                      producto;
                    return (
                      <CardCarrito
                        key={idProducto}
                        nombreProducto={nombreProducto}
                        descripcion={descripcion}
                        imagen={foto}
                        precio={precio}
                        cantidad={cantidad}
                        idCliente={idCliente}
                        idProducto={idProducto}
                        eliminar={() => deleteCarrito(idCliente, idProducto,nombreProducto)}
                        onCantidadChange={(nuevaCantidad) =>
                          handleCantidadChange(idProducto, nuevaCantidad)
                        }
                      />
                    );
                  })
                }
                </div>
                <CardResumen carrito={carrito} idCliente={idCliente} onPedidoSuccess={handlePedidoSuccess}/>
              </div>
            </div>
            }
    </>
  );
};

export default Carrito;
