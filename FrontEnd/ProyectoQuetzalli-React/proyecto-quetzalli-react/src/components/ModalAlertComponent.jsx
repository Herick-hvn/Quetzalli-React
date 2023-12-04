import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ModalAlertComponent = ({ datosProducto }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { nombreProducto, descripcion, precioVenta, foto } = datosProducto;
  // Dividir el texto en oraciones usando el punto como delimitador
  const oraciones = descripcion.split(".");

  // Tomar las dos primeras oraciones y lo remplazamos
  const desc = oraciones.slice(0, 2).join(".");
  const comprar = () =>{
    navigate('/login');
  }
  return (
    <div className="card-wrapper">
      <div className="card" onClick={toggleModal}>
        <div
          className="card-image"
          style={{
            objectFit: "cover",
            height: "80%",
            width: "80%",
            display: "block",
            margin: "0 auto",
          }}
        >
          <img src={foto} alt={nombreProducto} />
        </div>
        <div className="card-body" style={{ textAlign: "center" }}>
          <h2 style={{ textAlign: "center", textJustify: "inter-word" }}>
            {nombreProducto}
          </h2>
          <p style={{ textAlign: "justify" }}>{desc}.</p>
          <p style={{ textAlign: "justify" }}>$ {precioVenta} MXN</p>
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#182F2B",
              borderColor: "#182F2B",
              borderRadius: "4px",
              width: "100%", // El botón ocupará todo el ancho disponible
              marginTop: "0px", // Puedes ajustar el espacio superior si es necesario
            }}
            onClick={comprar}
          >
            Comprar
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
