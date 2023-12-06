import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/NavBar/NavBar.css";
import logo from "../../img/logoSinFondo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import Productos from "../../pages/Dashboard/CatalogoProductos/Productos";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const cerrarSesion = () =>{
    sessionStorage.clear();
    navigate('/')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{fontFamily: "serif"}}>
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="col-3">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
          {/* Menú de navegación */}
          <div
            className="collapse justify-content-end navbar-collapse"
            id="navbarNav"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="/productos">
                  Productos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/pedidos">
                  Pedidos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/carrito">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#" onClick={cerrarSesion}>
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
