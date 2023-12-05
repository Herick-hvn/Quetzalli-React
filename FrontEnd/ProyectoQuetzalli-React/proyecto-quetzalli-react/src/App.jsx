//import React from "react";
//import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPageClienteComponent from "./pages/LandingPageClienteComponent";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import DetallesProduto from "./pages/Dashboard/DetalleProducto/DetallesProduto";
import Carrito from "./pages/Dashboard/Carrito/Carrito";
//import MetodoPago from "./components/Carrito/MetodoPago";
import CrearUsuario from "./pages/CrearUsuario/CrearUsuario";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPageClienteComponent />} />
          <Route path="/productos" element={<Dashboard />} />
          <Route path="/CrearCuenta" element={<CrearUsuario />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/detalleproductos/:id" element={<DetallesProduto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
