import React, { useEffect, useState } from "react";
import NavBar from "../../../components/NavBarPrincipal/NavBar";
import CardCarrito from "../../../components/Carrito/CardCarrito";
import "./styles.css";
import NoProducts from "../../../components/Carrito/NoProducts";
import CardResumen from "../../../components/Carrito/CardResumen";
import Swal from "sweetalert2";
const Carrito = () => {
  const [carrito, setCarrito] = useState(() => {
    const storedCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    return storedCarrito;
  });

  const carritoCounts = {};

  useEffect(() => {
    // Ejecutar lógica cuando carrito cambia
    console.log("El carrito ha cambiado:", carrito);
    // Si necesitas hacer algo específico cuando carrito cambie, puedes hacerlo aquí
  }, [carrito]);


  carrito.forEach((producto) => {
    const { idproductos } = producto;
    carritoCounts[idproductos] = (carritoCounts[idproductos] || 0) + 1;
  });

  const eliminarProducto = (id) => {
    console.log(id);
  
    // Encontrar el índice del producto en el array del carrito
    const foundProductIndex = carrito.findIndex(
      (producto) => producto.idproductos == id
    );

    const {nombreProducto} = carrito.find((producto) => producto.idproductos == id);
  
    if (foundProductIndex !== -1) {
      // Crear una copia del carrito sin el producto encontrado
      const nuevoCarrito = [...carrito.slice(0, foundProductIndex), ...carrito.slice(foundProductIndex + 1)];
  
      // Actualizar el localStorage con el nuevo carrito
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
      setCarrito(nuevoCarrito);

      Swal.fire(
        "¡Producto eliminado del carrito!",
        `Este producto ${nombreProducto} se ha eliminado de tu carrito`,
        "success"
      );
    } else {
      console.log("Producto no encontrado en el carrito");
    }
  };

  return (
    <>
      <NavBar />

      {carrito.length === 0 ? (
              <NoProducts />
            ):
            <div className="container-fluid mt-3">
              <div className="row">
              <div className="col-9 d-flex flex-wrap">
                {
                  carrito.map((producto) => {
                    const { nombreProducto, precioVenta, descripcion, foto, idproductos } =
                      producto;
                    const cantidad = carritoCounts[idproductos];
                    return (
                      <CardCarrito
                        key={idproductos}
                        nombreProducto={nombreProducto}
                        descripcion={descripcion}
                        imagen={foto}
                        precio={precioVenta}
                        cantidad={cantidad}
                        eliminar={() => eliminarProducto(idproductos)}
                      />
                    );
                  })
                }
                </div>
                <CardResumen carrito={carrito}/>
              </div>
            </div>
            }
    </>
  );
};

export default Carrito;
