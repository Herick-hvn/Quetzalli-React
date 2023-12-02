import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const SweetalertAgregar = ({ producto, carrito, setCarrito}) => {
  const postCarrito = async (idCliente, producto) => {
    const url = "https://localhost:7239/api/Carrito";
    console.log(producto);
    console.log(idCliente);
    const { idproductos, nombreProducto, descripcion, precio } = producto;
    const data = {
      "idCliente": idCliente,
      "idProducto": idproductos,
      "nombreProducto": nombreProducto,
      "descripcion": descripcion,
      "cantidad": 1,
      "precio": precio,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        Swal.fire(
          "¡Producto no agregado al carrito!",
          "A ocurrido un error al agregar, intentelo de nuevo más tarde.",
          "warning"
        );
        // Si la respuesta no es exitosa, lanzar un error con el mensaje
        throw new Error(`Error alss agregar al carrito: ${response.statusText}`);
        
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
          onClick={() => mostrarSweetAlert()}
        >
          Agregar al carrito
        </Button>
      </div>
    </>
  );
};

export default SweetalertAgregar;
