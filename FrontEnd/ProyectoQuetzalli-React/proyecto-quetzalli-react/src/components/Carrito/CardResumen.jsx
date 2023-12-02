import React, { useEffect, useState } from 'react'
import "./styles.css";
const CardResumen = ({carrito}) => {

  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const countCarrito = () => {
    // Sumar las cantidades de cada producto en el carrito
    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    setCount(count);
  };
  
  const totalCarrito = () => {
    // Calcular el total sumando los precios de cada producto en el carrito
    const total = carrito.rñeduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    setTotal(total);
  };

  useEffect(() => {
    countCarrito;
    totalCarrito;
  })
  return (
    <>
      <div className="col-3 mx-auto">
            <div className="card mb-3" style={{ maxWidth: "18rem" }}>
              <div className="card-header">Resumen de carrito</div>
              <div className="card-body">
                <article className="item">
                  <p className="card-title flavor">Productos(2)</p>
                  <p className="price text-success">${}</p>
                </article>
                <article className="item">
                  <p className="card-text flavor">Total:</p>
                  <p className="price text-success">${total}</p>
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
    </>
  )
}

export default CardResumen
