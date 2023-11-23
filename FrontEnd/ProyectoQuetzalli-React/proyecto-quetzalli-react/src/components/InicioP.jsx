import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

function InicioP({ handleScrollToValores }) {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={6} className="d-flex align-items-center justify-content-center text-center mb-3">
          <div style={{ textAlign: "center" }}>
            <h2 style={{
                 fontFamily: "serif",
                 fontSize: "2rem",
                 letterSpacing: "2px",
                 fontWeight: "bold",
                 marginLeft: "20px",
                 color:'#756539'
            }}>Calidad y Estilo...</h2>
            <h1 style={{
                 fontFamily: "serif",
                 fontSize: "6rem",
                 letterSpacing: "2px",
                 fontWeight: "bold",
            }}>Quetzalli</h1>
            <div className="text-center mt-3">
              <Button
                className="btn"
                style={{
                  backgroundColor: "#182F2B",
                  borderColor: "#182F2B",
                  borderRadius: "20px",
                  background: "linear-gradient(to right, #182F2B, #1B743F)"
                }}
                onClick={handleScrollToValores}
              >
                Más información
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default InicioP;
