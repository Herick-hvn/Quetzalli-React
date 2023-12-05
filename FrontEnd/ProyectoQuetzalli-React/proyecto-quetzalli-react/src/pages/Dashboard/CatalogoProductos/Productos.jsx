import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SweetalertAgregar from "../../../components/Sweetalerts/SweetalertAgregar";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [productosMostrados, setProductosMostrados] = useState(8);
  const navigate = useNavigate();
  const [palabraProducto, setPalabraProducto] = useState("");

  const filterProduct = (event) => {
    setPalabraProducto(event.target.value);
  };

  // Obtener productos
  useEffect(() => {
    const getProductos = async () => {
      try {
        const response = await fetch("https://localhost:7239/api/Productos");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error.message);
      }
    };

    const idCliente = sessionStorage.getItem("idCliente");

    console.log(idCliente);

    getProductos();
  }, []);

  // Filtrar productos según la palabra clave
  const productosFiltrados = productos.filter((producto) =>
    producto.nombreProducto
      .toLowerCase()
      .includes(palabraProducto.toLowerCase())
  );

  // Cargar más productos
  const cargarMasProductos = () => {
    setProductosMostrados(productosMostrados + 8);
  };

  // Seleccionar la tarjeta y navegar al detalle del producto
  const handleCardClick = (id) => {
    navigate(`/detalleproductos/${id}`);
  };

  return (
    <>
      {/* Barra de búsqueda*/}
      <div
        className="d-flex justify-content-center mt-2"
        style={{ marginRight: "10px" }}
      >
        {/* Barra de búsqueda */}
        <input
          type="text"
          className="form-control form-control-sm mr-3"
          placeholder="Busca un producto"
          aria-label="Buscar"
          aria-describedby="basic-addon2"
          onChange={filterProduct}
          style={{ border: "1px solid" }}
        />
      </div>
      <Container>
        <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-3">
          {productosFiltrados
            .slice(0, productosMostrados)
            .map((producto, index) => (
              <Col key={index}>
                {/* Tarjeta de producto */}
                <Card
                  style={{
                    width: "100%",
                    border: "1px solid #182F2B",
                    marginTop: "12px",
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <Card.Img
                      src={producto.foto}
                      className="card-img-top"
                      alt={producto.nombreProducto}
                      style={{
                        objectFit: "cover",
                        height: "80%",
                        width: "80%",
                        display: "block",
                        margin: "0 auto",
                      }}
                      onClick={() => handleCardClick(producto.idproductos)}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title>{producto.nombreProducto}</Card.Title>
                    <Card.Text>{producto.descripcion.split(".")[0]}.</Card.Text>
                    <Card.Subtitle style={{ color: "green" }}>
                      ${producto.precioVenta}.00
                    </Card.Subtitle>
                    <SweetalertAgregar producto={producto} idCliente={1} />
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      {productosMostrados < productosFiltrados.length && (
        <Row className="mt-3">
          <Col className="text-center">
            <Button
              onClick={cargarMasProductos}
              style={{ backgroundColor: "#D2B76D", borderColor: "#D2B76D" }}
            >
              Cargar más
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Productos;
