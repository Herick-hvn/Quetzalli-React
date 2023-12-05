import React, { useState } from 'react';
import DatosTarjeta from './DatosTarjeta';
import NavBar from '../NavBarPrincipal/NavBar';
import "./styles.css";

const MetodoPago = () => {
  const [metodoPago, setMetodoPago] = useState('');

  const handleMetodoPagoChange = (e) => {
    setMetodoPago(e.target.value);
  };

  return (
    <>
      <div className="container-fluid mt-4">
      <div className='row'>
      <div className="">
        <label>Método de pago:</label>
        <select
          className="form-control"
          value={metodoPago}
          onChange={handleMetodoPagoChange}
        >
          <option value="">Selecciona un método de pago</option>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
      </div>
      </div>
      {metodoPago === 'tarjeta' && <DatosTarjeta/>}
    </div>
    </>
  );
  
};

export default MetodoPago;
