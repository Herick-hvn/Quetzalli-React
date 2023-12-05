import React from 'react';

const DatosTarjeta = () => {
  return (
    <>
    <div className=''>
    <h2>Datos de la Tarjeta</h2>
      <form>
        <div className="">
          <label htmlFor="nombreTarjeta" className="form-label">Nombre en la Tarjeta</label>
          <input type="text" className="form-control" id="nombreTarjeta" placeholder="Nombre del titular" />
        </div>
        <div className="">
          <label htmlFor="numeroTarjeta" className="form-label">Número de Tarjeta</label>
          <input type="text" className="form-control" id="numeroTarjeta" placeholder="Número de la tarjeta" />
        </div>
        <div className="row">
          <div className="">
            <label htmlFor="fechaExpiracion" className="form-label">Fecha de Expiración</label>
            <input type="text" className="form-control" id="fechaExpiracion" placeholder="MM/AA" />
          </div>
          <div className="">
            <label htmlFor="codigoSeguridad" className="form-label">Código de Seguridad</label>
            <input type="text" className="form-control" id="codigoSeguridad" placeholder="CVV" />
          </div>
        </div>
        {/* Otros campos y botones según sea necesario */}
        <button type="submit" className="btn btn custom-button">Confirmar Compra</button>
      </form>
    </div>
    </>
  );
};

export default DatosTarjeta;
