import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBarPrincipal/NavBar";
import Swal from "sweetalert2"; // Importa SweetAlert2
import "./detalle.css"; // Importa el archivo de estilos CSS

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

const DetallesPedido = () => {
  const { id } = useParams();
  const [pedidoInfo, setPedidoInfo] = useState({ cliente: null, pedido: {}, productos: [] });

  useEffect(() => {
    const fetchPedidoInfo = async () => {
      try {
        const response = await fetch(`https://localhost:7239/api/Pedidos/informacion/${id}`);

        if (!response.ok) {
          throw new Error("Error al obtener la información del pedido");
        }

        const data = await response.json();
        setPedidoInfo(data);
      } catch (error) {
        console.error("Error al obtener la información del pedido:", error.message);
        // Manejo de errores
      }
    };

    fetchPedidoInfo();
  }, [id]);

  const handleCancelarPedido = async () => {
    try {
      const requestBody = {
        idPedidos: id, // Agrega el ID del pedido al cuerpo de la solicitud
        estatus: 4 // Actualiza solo el estatus a Cancelado (4)
      };
  
      const response = await fetch(`https://localhost:7239/api/Pedidos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });
  
      console.log('Respuesta del servidor:', response); // Registro en la consola
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al cancelar el pedido - ${response.status}: ${errorMessage}`);
      }
  
      await Swal.fire({
        icon: "success",
        title: "Pedido cancelado",
        text: "El pedido ha sido cancelado exitosamente",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar"
      });
  
      // Actualizar la información del pedido después de la cancelación
      // ...
  
    } catch (error) {
      console.error("Error al cancelar el pedido:", error.message);
      // Manejo de errores
    }
  };
  

  return (
    <>
      <NavBar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2>Productos del Pedido</h2>
            {pedidoInfo.productos.map((item, index) => (
              <Card key={index} className="producto-card mb-3">
                <Row className="g-0 align-items-center">
                  <Col md={4}>
                    <Card.Img
                      src={item.producto.foto}
                      alt={item.producto.nombre}
                      className="producto-imagen img-fluid"
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{item.producto.nombre}</Card.Title>
                      <Card.Text>
                        <strong>Cantidad:</strong> {item.cantidad}
                        <br />
                        <strong>Precio Total:</strong> ${item.producto.precioVenta * item.cantidad}.00
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
          <Col md={4} className="d-flex align-items-stretch">
            <Card className="detalles-pedido-card">
              <Card.Body>
                <Card.Title>Detalles del Pedido</Card.Title>
                <Card.Text>
                  <strong>Total del Pedido:</strong> ${pedidoInfo.pedido.total}.00
                  <br />
                  <strong>Estatus del Pedido:</strong>{" "}
                  {obtenerEstadoPedido(pedidoInfo.pedido.estatus)}
                </Card.Text>
                {pedidoInfo.pedido.estatus === 1 && (
                  <Button variant="danger" onClick={() => {
                    Swal.fire({
                      title: '¿Estás seguro?',
                      text: '¿Quieres cancelar este pedido?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6',
                      confirmButtonText: 'Sí, cancelar pedido'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleCancelarPedido();
                      }
                    });
                  }}>
                    Cancelar Pedido
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetallesPedido;
