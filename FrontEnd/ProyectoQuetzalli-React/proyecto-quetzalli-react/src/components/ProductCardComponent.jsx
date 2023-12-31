import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCardComponent = ({ producto }) => {
  const navigate = useNavigate();
  const comprar = () =>{
    navigate('/login');
  }
  return (
    <Col className="mb-4 d-flex justify-content-center">
      {/* Tarjeta de producto */}
      <Card style={{ borderColor: "white" }}>
        <div style={{ height: "200px", overflow: "hidden" }}>
          <Card.Img
            src={producto.foto}
            className="card-img-top"
            style={{
              objectFit: "cover",
              height: "100%",
              width: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title>{producto.nombreProducto}</Card.Title>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#182F2B", borderColor: "#182F2B" }}
            onClick={comprar}
          >
            Comprar
          </button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCardComponent;
