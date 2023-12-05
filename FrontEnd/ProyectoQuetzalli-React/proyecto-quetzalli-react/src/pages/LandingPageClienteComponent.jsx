import { useState, useEffect, useRef } from "react";
import NavBarPagina from "../components/NavBarPagina";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/Custom/custom.css";
import ModalAlertComponent from "../components/ModalAlertComponent";
import ProductCardComponent from "../components/ProductCardComponent";
import { Carousel } from "react-bootstrap";
import FooterComponent from "../components/FooterComponent";
import ScrollButton from "../components/ScrollButton";
import InicioP from "../components/InicioP";

const LandingPageClienteComponent = () => {
  const valoresRef = useRef(null);

  const scrollToValores = () => {
    if (valoresRef.current !== null) {
      valoresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [productos, setProductos] = useState([]);
  const [productosMostrados, setProductosMostrados] = useState(3);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("https://localhost:7239/api/Productos");
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const cargarMasProductos = () => {
    setProductosMostrados(productosMostrados + 3);
  };

  return (
    <div>
      <NavBarPagina />
      <Container fluid>
        <Row className="mt-4 align-items-center justify-content-center">
          <Col md={6}>
            <InicioP handleScrollToValores={scrollToValores} />
          </Col>
          <Col md={5} className="pl-md-5">
            <Carousel className="text-center">
              {productos.map((producto) => (
                <Carousel.Item key={producto.idproductos}>
                  <ProductCardComponent producto={producto} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex justify-content-center align-items-center">
            <div style={{ textAlign: "center", width: "80%" }}>
              <hr
                style={{
                  borderColor: "#835a06",
                  borderWidth: "1px",
                  width: "100%",
                  margin: "20px auto",
                }}
              />
              <p
                style={{
                  fontFamily: "serif",
                  fontSize: "2rem",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Diseños que cambiaran tu vida.
              </p>
              <hr
                style={{
                  borderColor: "#835a06",
                  borderWidth: "1px",
                  width: "100%",
                  margin: "20px auto",
                }}
              />
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          {productos.slice(0, productosMostrados).map((producto, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={4}>
              <ModalAlertComponent datosProducto={producto} />
            </Col>
          ))}
        </Row>
        {productosMostrados < productos.length && (
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
        <Row className="mt-4">
          <Col className="d-flex justify-content-center align-items-center">
            <div style={{ textAlign: "center", width: "90%" }}>
              <hr
                style={{
                  borderColor: "#D2B76D",
                  borderWidth: "2px",
                  width: "100%",
                  margin: "20px auto",
                }}
              />
              <h3
                style={{
                  fontFamily: "serif",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  letterSpacing: "2px",
                }}
              >
                ¿QUÉ NOS DIFERENCIA?
              </h3>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Imágenes */}
                <div style={{ margin: "30px", textAlign: "center" }}>
                  <img
                    src="src\img\001-diamond-80x80.png"
                    alt="Imagen 1"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    Diseños Modernos & Variedad
                  </p>
                </div>
                <div style={{ margin: "30px", textAlign: "center" }}>
                  <img
                    src="src\img\003-secure-payment-80x80.png"
                    alt="Imagen 2"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    Compra Protegida & Compra Nacional
                  </p>
                </div>
                <div style={{ margin: "30px", textAlign: "center" }}>
                  <img
                    src="src\img\001-shipped-80x80.png"
                    alt="Imagen 3"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    Envíos gratis arriba de $1,500
                  </p>
                </div>
                <div style={{ margin: "30px", textAlign: "center" }}>
                  <img
                    src="src\img\004-open-80x80.png"
                    alt="Imagen 4"
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  />
                  <p
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    Showroom en León
                  </p>
                </div>
              </div>
              <hr
                style={{
                  borderColor: "#D2B76D",
                  borderWidth: "2px",
                  width: "100%",
                  margin: "20px auto",
                }}
              />
            </div>
          </Col>
        </Row>
        <Row className="mt-6" ref={valoresRef} style={{ marginBottom: "30px" }}>
          <Col>
            <Carousel>
              {/* Carrusel para Misión */}
              <Carousel.Item>
                <div className="container">
                  <div className="text">
                    <h2
                      style={{
                        fontFamily: "serif",
                        fontSize: "2rem",
                        letterSpacing: "2px",
                        fontWeight: "bold",
                      }}
                    >
                      Misión
                    </h2>
                    <p>
                      Quetzalli es una marca de joyería artesanal que busca
                      embellecer la vida de las personas a través de piezas
                      únicas y significativas. Creemos que las joyas pueden
                      conectar con las emociones y reflejar la individualidad de
                      cada cliente, convirtiendo momentos en recuerdos
                      preciosos.
                    </p>
                  </div>
                  <div className="image">
                    <img src="src\img\logo.png" alt="Imagen Misión" />
                  </div>
                </div>
              </Carousel.Item>

              {/* Carrusel para Visión */}
              <Carousel.Item>
                <div className="container">
                  <div className="text">
                    <h2
                      style={{
                        fontFamily: "serif",
                        fontSize: "2rem",
                        letterSpacing: "2px",
                        fontWeight: "bold",
                      }}
                    >
                      Visión
                    </h2>
                    <p>
                      Quetzalli aspira a ser reconocida como líder en la
                      creación y comercialización de joyería artesanal. Queremos
                      expandir nuestra presencia globalmente e inspirar a las
                      personas a expresar su estilo a través de nuestras joyas.
                    </p>
                  </div>
                  <div className="image">
                    <img src="src\img\logo.png" alt="Imagen Visión" />
                  </div>
                </div>
              </Carousel.Item>

              {/* Carrusel para Valores */}
              <Carousel.Item>
                <div className="container">
                  <div className="text">
                    <h2
                      style={{
                        fontFamily: "serif",
                        fontSize: "2rem",
                        letterSpacing: "2px",
                        fontWeight: "bold",
                      }}
                    >
                      Valores
                    </h2>
                    <ul>
                      <li>
                        {" "}
                        Creatividad: Abrazamos la innovación y la creatividad en
                        cada diseño y proceso artesanal.
                      </li>
                      <li>
                        {" "}
                        Calidad: Nos comprometemos con la excelencia en cada
                        detalle.
                      </li>
                      <li>
                        {" "}
                        Integridad: Actuamos con honestidad, transparencia y
                        ética en todas nuestras operaciones.
                      </li>
                    </ul>
                  </div>
                  <div className="image">
                    <img src="src\img\logo.png" alt="Imagen Valores" />
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
        <Row>
          <div style={{ position: "relative", height: "20px" }}>
            <div style={{ position: "fixed", bottom: "20px", right: "80px" }}>
              <ScrollButton />
            </div>
          </div>
          <FooterComponent />
        </Row>
      </Container>
    </div>
  );
};

export default LandingPageClienteComponent;
