import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBarPrincipal/NavBar";
import logo from "../../../img/logo.png"; // Importa la imagen
import "./Pedidos.css"; // Importa el archivo de estilos CSS

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosMostrados, setPedidosMostrados] = useState(8);
  const navigate = useNavigate();
  const [palabraPedido, setPalabraPedido] = useState("");

  const filterPedido = (event) => {
    setPalabraPedido(event.target.value);
  };

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch("https://localhost:7239/api/Pedidos");
        if (!response.ok) {
          throw new Error("Error al obtener los pedidos");
        }
        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error.message);
      }
    };

    fetchPedidos();
  }, []);

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      String(pedido.idCliente) === sessionStorage.getItem("idCliente")
  );

  const cargarMasPedidos = () => {
    setPedidosMostrados(pedidosMostrados + 8);
  };

  const handlePedidoClick = (id) => {
    navigate(`/detallepedido/${id}`);
  };

  const convertirFechaATexto = (fechaString) => {
    const fecha = new Date(fechaString);
    const opcionesFecha = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return fecha.toLocaleDateString("es-ES", opcionesFecha);
  };

  const obtenerColorTexto = (estatus) => {
    switch (estatus) {
      case 2: // Entregado
        return "text-success"; // Verde
      case 1: // Procesando
        return "text-warning"; // Amarillo
      case 3: // Enviado
        return "text-primary"; // Azul
      case 4: // Cancelado
        return "text-danger"; // Rojo
      default:
        return "text-dark"; // Color por defecto
    }
  };

  const obtenerEstadoPedido = (estatus) => {
    switch (estatus) {
      case 2:
        return "Entregado";
      case 1:
        return "En proceso";
      case 3:
        return "Enviado";
      case 4:
        return "Cancelado";
      default:
        return "Estado desconocido";
    }
  };

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center mt-2">
        <input
          type="text"
          className="form-control form-control-sm mr-3"
          placeholder="Buscar un pedido"
          aria-label="Buscar"
          aria-describedby="basic-addon2"
          onChange={filterPedido}
        />
      </div>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {pedidosFiltrados.slice(0, pedidosMostrados).map((pedido, index) => (
            <Col key={index} className="d-flex align-items-stretch">
              <Card className="w-100" style={{ marginBottom: "20px" }}>
                <Card.Img variant="top" src={logo} alt="Logo" />
                <Card.Body>
                  <Card.Title>
                    <span className={obtenerColorTexto(pedido.estatus)}>
                      {obtenerEstadoPedido(pedido.estatus)} - Pedido #{pedido.idPedidos}
                    </span>
                  </Card.Title>
                  <Card.Text>
                    {pedido.estatus === 3 ? (
                      <span>
                        Fecha estimada de entrega: {convertirFechaATexto(pedido.fechaEntrega)}
                        <br />
                      </span>
                    ) : null}
                    {pedido.estatus === 2 ? (
                      <span>
                        Pedido entregado el {convertirFechaATexto(pedido.fechaEntrega)}
                        <br />
                      </span>
                    ) : null}
                    {pedido.estatus === 1 ? (
                      <span>
                        El pedido está siendo preparado para su envío
                        <br />
                      </span>
                    ) : null}
                    {pedido.estatus === 4 ? (
                      <span>
                        Pedido cancelado el {convertirFechaATexto(pedido.fechaPedido)}
                        <br />
                      </span>
                    ) : null}
                    <hr />
                    <span style={{ fontWeight: "bold", fontSize: "1.2em", textAlign: "right", marginTop: "20px" }}>
                      Total: ${pedido.total}
                    </span>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handlePedidoClick(pedido.idPedidos)}
                  >
                    Ver Pedido
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {pedidosMostrados < pedidosFiltrados.length && (
        <Row className="mt-3">
          <Col className="text-center">
            <Button onClick={cargarMasPedidos}>Cargar más</Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Pedidos;
