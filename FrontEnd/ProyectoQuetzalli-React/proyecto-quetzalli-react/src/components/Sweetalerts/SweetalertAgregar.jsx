import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const SweetalertAgregar = ({ producto, idCliente }) => {
  const getCarritoById = async () => {
    const { idproductos } = producto;
    console.log(idCliente);
    const url = `https://localhost:7239/api/Carrito/${idCliente}/${idproductos}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener producto");
      }
      const data = await response.json();

      return [data];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const postCarrito = async (idCliente, producto) => {
    const product = await getCarritoById();
    console.log(product);
    if (product.length === 0) {
      saveCarrito(idCliente, producto);
    } else {
      updateCarrito(idCliente);
      console.log("Ya existe pa");
    }
  };

  const saveCarrito = async (idCliente, producto) => {
    const url = "https://localhost:7239/api/Carrito";

    const { idproductos, nombreProducto, descripcion, precioVenta, foto } =
      producto;

    const data = {
      idCarrito: 0,
      idCliente: idCliente,
      idProducto: idproductos,
      nombreProducto: `${nombreProducto}`,
      descripcion: `${descripcion}`,
      cantidad: 1,
      precio: precioVenta,
      foto: `${foto}`,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response.status);

      if (!response.ok) {
        Swal.fire(
          "¡Producto no agregado al carrito!",
          "A ocurrido un error al agregar, intentelo de nuevo más tarde.",
          "warning"
        );
        // Si la respuesta no es exitosa, lanzar un error con el mensaje
        throw new Error(`Error al agregar al carrito: ${response.statusText}`);
      }

      // Si la respuesta es exitosa, puedes hacer algo con los datos de la respuesta
      const responseData = await response.json();
      console.log("Producto agregado al carrito:", responseData);
      Swal.fire(
        "¡Productos agregados al carrito!",
        "Estos productos han sido añadidos a tu carrito",
        "success"
      );
    } catch (error) {
      // Capturar y manejar cualquier error durante la solicitud
      console.error("Error al realizar la solicitud:", error.message);
    }
  };

  const updateCarrito = async (idCliente) => {
    const product = await getCarritoById();
    const { idProducto, cantidad } = product[0];
    const url = `https://localhost:7239/api/Carrito/${idCliente}/${idProducto}`;
    const cant = cantidad + 1;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cant),
      });

      if (!response.ok) {
        Swal.fire(
          "¡Producto no agregado al carrito!",
          "A ocurrido un error al agregar, intentelo de nuevo más tarde.",
          "warning"
        );
        // Si la respuesta no es exitosa, lanzar un error con el mensaje
        throw new Error(`Error al agregar al carrito: ${response.statusText}`);
      }

      Swal.fire(
        "¡Productos agregados al carrito!",
        "Estos productos han sido añadidos a tu carrito",
        "success"
      );
    } catch (error) {
      // Capturar y manejar cualquier error durante la solicitud
      console.error("Error al realizar la solicitud:", error.message);
    }
  };

  const mostrarSweetAlert = () => {
    const updatedCarrito = [...carrito, ...producto];
    setCarrito(updatedCarrito);
    localStorage.setItem("carrito", JSON.stringify(updatedCarrito));

    Swal.fire(
      "¡Productos agregados al carrito!",
      "Estos productos han sido añadidos a tu carrito",
      "success"
    );
  };

  return (
    <>
      <div>
        <Button
          className="btn btn-primary"
          style={{
            backgroundColor: "#182F2B",
            borderColor: "#182F2B",
            marginTop: "5px",
          }}
          onClick={() => postCarrito(idCliente, producto)}
        >
          Agregar al carrito
        </Button>
      </div>
    </>
  );
};

export default SweetalertAgregar;
