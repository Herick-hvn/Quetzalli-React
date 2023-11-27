import React from "react";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const SweetalertAgregar = () => {
  const mostrarSweetAlert = () => {
    Swal.fire(
      "¡Producto agregado al carrito!",
      "Este producto ya esta en tu carrito",
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
          onClick={mostrarSweetAlert}
        >
          Agregar al carrito
        </Button>
      </div>
    </>
  );
};

export default SweetalertAgregar;
