import React, { useState } from "react";

const ModalAlertComponent = ({ datosProducto }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="card-wrapper">
      <div className="card" onClick={toggleModal}>
        <div className="card-image">
          <img src={datosProducto.foto} alt={datosProducto.nombreProducto} />
        </div>
        <div className="card-body" style={{ textAlign: "center" }}>
          <h2 style={{ textAlign: "center", textJustify: "inter-word" }}>
            {datosProducto.nombreProducto}
          </h2>
          <p style={{ textAlign: "justify" }}>{datosProducto.descripcion}</p>
          <p style={{ textAlign: "justify" }}>
            $ {datosProducto.precioVenta} MXN
          </p>
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#182F2B",
              borderColor: "#182F2B",
              borderRadius: "4px",
              width: "100%", // El botón ocupará todo el ancho disponible
              marginTop: "0px", // Puedes ajustar el espacio superior si es necesario
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>{datosProducto.nombreProducto}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalAlertComponent;
