import React, { useState } from "react";

const CardCarrito = ({
  id,
  nombreProducto,
  descripcion,
  precio,
  imagen,
  cantidad,
  eliminar,
  idProducto,
  idCliente,
  onCantidadChange 
}) => {
  const [cant, setCantidad] = useState(cantidad);

  const handleIncrement = () => {
    const newCantidad = cant + 1;
    setCantidad(newCantidad);
    onCantidadChange(newCantidad);
    updateCarrito(newCantidad);
  };

  const handleDecrement = () => {
    if (cant > 1) {
      const newCantidad = cant - 1;
      setCantidad(newCantidad);
      onCantidadChange(newCantidad);
      updateCarrito(newCantidad);
    }
  };

  const updateCarrito = async (newCantidad) => {
    const url = `https://localhost:7239/api/Carrito/${idCliente}/${idProducto}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCantidad),
      });

      if (!response.ok) {
        console.error(`Error al agregar al carrito: ${response.statusText}`);
        return;
      }

      console.log("Producto agregado al carrito exitosamente");
    } catch (error) {
      console.error("Error al realizar la solicitud:", error.message);
    }
  };
  

  // Dividir el texto en oraciones usando el punto como delimitador
  const oraciones = descripcion.split(".");

  // Tomar las dos primeras oraciones y lo remplazamos
  descripcion = oraciones.slice(0, 2).join(".");
  return (
    <>
    <div className="card mb-3 ms-3" style={{ maxWidth: "500px" }}>
      <div className="position-absolute top-0 end-0">
        <button className="btn custom-button-delete me-2 mt-1" onClick={eliminar}>
          X
        </button>
      </div>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imagen} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{nombreProducto}</h5>
            <p className="card-text">{descripcion}</p>
            <div className="card-text">
              <span
                style={{ color: "green", fontSize: "20px" }}
                className="pe-5"
              >
                ${precio}
              </span>
              <div className="cantidad-container">
                <button
                  className="cantidad-button decrementar"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  type="text"
                  className="cantidad-input"
                  value={cant}
                  readOnly
                />
                <button
                  className="cantidad-button incrementar"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default CardCarrito;
