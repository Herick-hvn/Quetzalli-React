import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import NavBar from "../../../components/NavBarPrincipal/NavBar";
import SweetalertAgregar from "../../../components/Sweetalerts/SweetalertAgregar";

const DetallesProduto = () => {
  const [producto, setProducto] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getIdProducto = async () => {
      try {
        const response = await fetch(
          `https://localhost:7239/api/Productos/${id}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener el producto");
        }

        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error.message);
        // Puedes manejar la redirección o el manejo de errores aquí
      }
    };

    getIdProducto();
  }, [id]);

  return (
    <>
      <NavBar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div
          className="card2"
          style={{
            width: "80%",
            border: "1px solid #182F2B",
          }}
        >
          <div style={{ height: "100%" }}>
            <Card.Img
              src={producto.foto}
              className="card-img"
              alt={producto.nombreProducto}
              style={{
                objectFit: "cover",
                height: "100%",
                width: "30%",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
          <Card.Body className="text-center">
            <Card.Title>{producto.nombreProducto}</Card.Title>
            <Card.Text>{producto.descripcion}.</Card.Text>
            <Card.Subtitle style={{ color: "green" }}>
              ${producto.precioVenta}.00
            </Card.Subtitle>
            <SweetalertAgregar />
          </Card.Body>
        </div>
      </Container>
    </>
  );
};

export default DetallesProduto;
