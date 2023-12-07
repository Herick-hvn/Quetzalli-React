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

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPageClienteComponent />} />
          <Route path="/productos" element={<Dashboard />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/pedidos" element={<Pedidos />} /> {/* Ruta para Pedidos */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/detallepedido/:id" element={<DetallesPedido />} />
          <Route path="/detalleproductos/:id" element={<DetallesProduto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/CrearCuenta" element={<CrearUsuario />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
