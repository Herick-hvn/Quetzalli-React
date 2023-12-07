// App.js
import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPageClienteComponent from "./pages/LandingPageClienteComponent";
import LoginForm from "./pages/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import DetallesProduto from "./pages/Dashboard/DetalleProducto/DetallesProduto";
import Carrito from "./pages/Dashboard/Carrito/Carrito";
import CrearUsuario from "./pages/CrearUsuario/CrearUsuario";
import ContactPage from "./pages/Contacto";
import Pedidos from "./pages/Dashboard/Pedidos/Pedidos";
import DetallesPedido from "./pages/DetallePedido/DetallePedido";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPageClienteComponent />} />
          <Route path="/login" element={<LoginForm />} />
          
          {/* Rutas protegidas */}

          <Route path="/productos" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/pedidos" element={<PrivateRoute><Pedidos /></PrivateRoute>} />
          <Route path="/detallepedido/:id" element={<PrivateRoute><DetallesPedido /></PrivateRoute>} />
          <Route path="/detalleproductos/:id" element={<PrivateRoute><DetallesProduto /></PrivateRoute>} />
          <Route path="/carrito" element={<PrivateRoute><Carrito /></PrivateRoute>} />
          
          {/* Fin de rutas protegidas */}
          
          <Route path="/CrearCuenta" element={<CrearUsuario />} /> 
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
