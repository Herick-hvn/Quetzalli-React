import React, { useEffect, useState } from 'react';
import "./styles.css";

const CardResumen = ({ carrito}) => {
  const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  const totalCarrito = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

  console.log(carrito);

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
            >
              Continuar Compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardResumen;
